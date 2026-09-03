import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  redirect: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock('@/lib/admin/require-admin', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/admin/require-admin')>();
  return { ...original, requireAdmin: mocks.requireAdmin };
});
vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
}));
vi.mock('next/cache', () => ({
  revalidatePath: mocks.revalidatePath,
}));

import { AdminActionError } from '@/lib/admin/require-admin';
import { deleteCustomer } from '@/app/admin/(protected)/customers/actions';
import { deleteFeedback, togglePublish } from '@/app/admin/(protected)/feedback/actions';
import { archiveInquiry, updateInquiry } from '@/app/admin/(protected)/inquiries/actions';
import { createArticle, deleteArticle, updateArticle } from '@/app/admin/(protected)/knowledge/actions';
import { createOrder, updateOrder } from '@/app/admin/(protected)/orders/actions';

const UUID = '4bdb4bea-06d2-4c44-ae2e-39e1214642a6';

type MutationKind = 'insert' | 'update' | 'delete';

function createSupabaseDouble() {
  const mutationCalls: Array<{ kind: MutationKind; table: string; value?: unknown }> = [];
  let table = '';

  const query = {
    insert: vi.fn((value: unknown) => {
      mutationCalls.push({ kind: 'insert', table, value });
      return query;
    }),
    update: vi.fn((value: unknown) => {
      mutationCalls.push({ kind: 'update', table, value });
      return query;
    }),
    delete: vi.fn(() => {
      mutationCalls.push({ kind: 'delete', table });
      return query;
    }),
    select: vi.fn(() => query),
    eq: vi.fn(() => query),
    single: vi.fn().mockResolvedValue({ data: { id: UUID }, error: null }),
    then: (
      resolve: (value: { data: { id: string } | null; error: null }) => unknown,
      reject?: (reason: unknown) => unknown
    ) => Promise.resolve({ data: { id: UUID }, error: null }).then(resolve, reject),
  };

  const supabase = {
    from: vi.fn((name: string) => {
      table = name;
      return query;
    }),
  };

  return { supabase, mutationCalls };
}

function form(values: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
}

const validArticle = {
  title: 'A practical PCB assembly guide',
  slug: 'practical-pcb-assembly-guide',
  description: 'A concise guide.',
  content: 'Useful engineering content.',
  cover_image: '/images/guide.webp',
  author: 'Huitai Engineering Team',
  read_time: '5',
  status: 'draft',
  published_at: '',
};

type ActionCase = {
  name: string;
  invokeValid: () => Promise<unknown>;
  invokeMalformed: () => Promise<unknown>;
  expectedMutation: MutationKind;
  expectedTable: string;
};

const cases: ActionCase[] = [
  {
    name: 'updateInquiry',
    invokeValid: () => updateInquiry(form({ id: UUID, status: 'quoted', internal_notes: 'Follow up Friday' })),
    invokeMalformed: () => updateInquiry(form({ id: 'not-a-uuid', status: 'root', internal_notes: '' })),
    expectedMutation: 'update',
    expectedTable: 'inquiries',
  },
  {
    name: 'archiveInquiry',
    invokeValid: () => archiveInquiry(form({ id: UUID })),
    invokeMalformed: () => archiveInquiry(form({ id: 'not-a-uuid' })),
    expectedMutation: 'update',
    expectedTable: 'inquiries',
  },
  {
    name: 'deleteCustomer',
    invokeValid: () => deleteCustomer(form({ id: UUID })),
    invokeMalformed: () => deleteCustomer(form({ id: '../customers' })),
    expectedMutation: 'delete',
    expectedTable: 'customers',
  },
  {
    name: 'togglePublish',
    invokeValid: () => togglePublish(form({ id: UUID, is_published: 'false', admin_response: 'Reviewed.' })),
    invokeMalformed: () => togglePublish(form({ id: UUID, is_published: 'yes', admin_response: 'Reviewed.' })),
    expectedMutation: 'update',
    expectedTable: 'feedback_messages',
  },
  {
    name: 'deleteFeedback',
    invokeValid: () => deleteFeedback(form({ id: UUID })),
    invokeMalformed: () => deleteFeedback(form({ id: '' })),
    expectedMutation: 'delete',
    expectedTable: 'feedback_messages',
  },
  {
    name: 'updateOrder',
    invokeValid: () => updateOrder(form({
      id: UUID,
      status: 'in_production',
      product_name: '4-layer controller PCB',
      quantity: '100',
      board_amount: '220.50',
      bom_amount: '500',
      unit_price: '8.25',
      total_amount: '825',
      notes: 'Priority build',
    })),
    invokeMalformed: () => updateOrder(form({
      id: UUID,
      status: 'paid_by_attacker',
      product_name: 'PCB',
      quantity: '-4',
      board_amount: 'Infinity',
      bom_amount: '0',
      unit_price: '0',
      total_amount: '0',
      notes: '',
    })),
    expectedMutation: 'update',
    expectedTable: 'orders',
  },
  {
    name: 'createOrder',
    invokeValid: () => createOrder(form({
      customer_name: 'Ada Buyer',
      company: 'Example Electronics',
      country: 'US',
      email: 'ada@example.test',
      phone: '+1 555 0100',
      product_name: '4-layer controller PCB',
      quantity: '100',
      board_amount: '220.50',
      bom_amount: '500',
      unit_price: '8.25',
      total_amount: '825',
      status: 'pending',
      notes: 'Priority build',
      image_1: `orders/${UUID}/order-1.webp`,
      image_2: '',
      image_3: '',
    })),
    invokeMalformed: () => createOrder(form({
      customer_name: '',
      company: '',
      country: '',
      email: 'not-an-email',
      phone: '',
      product_name: 'PCB',
      quantity: '-1',
      board_amount: '0',
      bom_amount: '0',
      unit_price: '0',
      total_amount: '0',
      status: 'superadmin',
      notes: '',
      image_1: 'javascript:alert(1)',
      image_2: '',
      image_3: '',
    })),
    expectedMutation: 'insert',
    expectedTable: 'orders',
  },
  {
    name: 'createArticle',
    invokeValid: () => createArticle(form(validArticle)),
    invokeMalformed: () => createArticle(form({ ...validArticle, title: '', status: 'administrator' })),
    expectedMutation: 'insert',
    expectedTable: 'articles',
  },
  {
    name: 'updateArticle',
    invokeValid: () => updateArticle(form({ ...validArticle, id: UUID })),
    invokeMalformed: () => updateArticle(form({ ...validArticle, id: 'not-a-uuid', read_time: '-5' })),
    expectedMutation: 'update',
    expectedTable: 'articles',
  },
  {
    name: 'deleteArticle',
    invokeValid: () => deleteArticle(form({ id: UUID })),
    invokeMalformed: () => deleteArticle(form({ id: '1 OR 1=1' })),
    expectedMutation: 'delete',
    expectedTable: 'articles',
  },
];

describe.each(cases)('$name', ({ invokeValid, invokeMalformed, expectedMutation, expectedTable }) => {
  let database: ReturnType<typeof createSupabaseDouble>;

  beforeEach(() => {
    database = createSupabaseDouble();
    mocks.requireAdmin.mockReset();
    mocks.redirect.mockReset();
    mocks.revalidatePath.mockReset();
  });

  it('rejects an anonymous caller without any mutation side effect', async () => {
    mocks.requireAdmin.mockRejectedValue(new AdminActionError('UNAUTHENTICATED'));

    await expect(invokeValid()).rejects.toMatchObject({ code: 'UNAUTHENTICATED' });
    expect(database.mutationCalls).toHaveLength(0);
    expect(mocks.redirect).not.toHaveBeenCalled();
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });

  it('rejects an authenticated non-admin without any mutation side effect', async () => {
    mocks.requireAdmin.mockRejectedValue(new AdminActionError('FORBIDDEN'));

    await expect(invokeValid()).rejects.toMatchObject({ code: 'FORBIDDEN' });
    expect(database.mutationCalls).toHaveLength(0);
    expect(mocks.redirect).not.toHaveBeenCalled();
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });

  it('allows an admin with valid input to enter only the intended mutation path', async () => {
    mocks.requireAdmin.mockResolvedValue({ supabase: database.supabase });

    await invokeValid();

    expect(database.mutationCalls).toEqual([
      expect.objectContaining({ kind: expectedMutation, table: expectedTable }),
    ]);
  });

  it('rejects malformed admin input without any mutation side effect', async () => {
    mocks.requireAdmin.mockResolvedValue({ supabase: database.supabase });

    await expect(invokeMalformed()).rejects.toMatchObject({ code: 'INVALID_INPUT' });
    expect(database.mutationCalls).toHaveLength(0);
    expect(mocks.redirect).not.toHaveBeenCalled();
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });
});

describe('order database contract validation', () => {
  let database: ReturnType<typeof createSupabaseDouble>;

  beforeEach(() => {
    database = createSupabaseDouble();
    mocks.requireAdmin.mockReset();
    mocks.redirect.mockReset();
    mocks.revalidatePath.mockReset();
    mocks.requireAdmin.mockResolvedValue({ supabase: database.supabase });
  });

  function orderUpdateWithBoardAmount(boardAmount: string) {
    return form({
      id: UUID,
      status: 'pending',
      product_name: 'Controller PCB',
      quantity: '10',
      board_amount: boardAmount,
      bom_amount: '0',
      unit_price: '0',
      total_amount: '0',
      notes: '',
    });
  }

  it('rejects a legacy opaque order identifier before any database mutation', async () => {
    await expect(updateOrder(form({
      id: 'order_2026_001',
      status: 'pending',
      product_name: 'Controller PCB',
      quantity: '10',
      board_amount: '100.00',
      bom_amount: '200.00',
      unit_price: '30.00',
      total_amount: '300.00',
      notes: '',
    }))).rejects.toMatchObject({ code: 'INVALID_INPUT' });

    expect(database.mutationCalls).toHaveLength(0);
  });

  it.each([
    ['board_amount', '0.001'],
    ['bom_amount', '12.345'],
    ['unit_price', '1e3'],
    ['total_amount', '10000000000.00'],
  ])('rejects %s values that numeric(12,2) cannot represent exactly', async (field, value) => {
    await expect(updateOrder(form({
      id: UUID,
      status: 'pending',
      product_name: 'Controller PCB',
      quantity: '10',
      board_amount: field === 'board_amount' ? value : '100.00',
      bom_amount: field === 'bom_amount' ? value : '200.00',
      unit_price: field === 'unit_price' ? value : '30.00',
      total_amount: field === 'total_amount' ? value : '300.00',
      notes: '',
    }))).rejects.toMatchObject({ code: 'INVALID_INPUT' });

    expect(database.mutationCalls).toHaveLength(0);
  });

  it.each([
    ['9999999999.99', 9_999_999_999.99],
    ['0', 0],
    ['0.01', 0.01],
  ])('accepts the numeric(12,2) boundary value %s', async (value, expected) => {
    await updateOrder(orderUpdateWithBoardAmount(value));

    expect(database.mutationCalls).toEqual([
      expect.objectContaining({
        kind: 'update',
        table: 'orders',
        value: expect.objectContaining({ board_amount: expected }),
      }),
    ]);
  });

  it.each([
    '10000000000.00',
    '1.001',
    '1e3',
    'Infinity',
    'NaN',
    '-1',
  ])('rejects the invalid numeric(12,2) boundary value %s', async (value) => {
    await expect(updateOrder(orderUpdateWithBoardAmount(value)))
      .rejects.toMatchObject({ code: 'INVALID_INPUT' });

    expect(database.mutationCalls).toHaveLength(0);
  });

  it('stores a private order-images object path instead of a public URL', async () => {
    const path = `orders/${UUID}/board.webp`;

    await createOrder(form({
      customer_name: 'Ada Buyer',
      company: 'Example Electronics',
      country: 'US',
      email: 'ada@example.test',
      phone: '+1 555 0100',
      product_name: 'Controller PCB',
      quantity: '10',
      board_amount: '100.00',
      bom_amount: '200.00',
      unit_price: '30.00',
      total_amount: '300.00',
      status: 'pending',
      notes: '',
      image_1: path,
      image_2: '',
      image_3: '',
    }));

    expect(database.mutationCalls).toEqual([
      expect.objectContaining({
        kind: 'insert',
        table: 'orders',
        value: expect.objectContaining({ image_1: path }),
      }),
    ]);
  });

  it('rejects a permanent public URL for a newly created order row', async () => {
    await expect(createOrder(form({
      customer_name: 'Ada Buyer',
      company: '',
      country: '',
      email: '',
      phone: '',
      product_name: 'Controller PCB',
      quantity: '10',
      board_amount: '100.00',
      bom_amount: '200.00',
      unit_price: '30.00',
      total_amount: '300.00',
      status: 'pending',
      notes: '',
      image_1: 'https://example.test/storage/v1/object/public/order-images/board.webp',
      image_2: '',
      image_3: '',
    }))).rejects.toMatchObject({ code: 'INVALID_INPUT' });

    expect(database.mutationCalls).toHaveLength(0);
  });
});
