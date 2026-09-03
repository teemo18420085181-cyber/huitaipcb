'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/require-admin';
import { isOrderImageObjectPath } from '@/lib/admin/order-image-model';
import {
  assertMutationSucceeded,
  databaseUuid,
  formString,
  parseAdminInput,
} from '@/lib/admin/action-validation';

const amount = z.string().trim().refine((value) => {
  const normalized = value || '0';
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return false;
  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) && numericValue <= 9_999_999_999.99;
}).transform((value) => Number(value || '0'));
const optionalEmail = z.string().trim().max(320).refine(
  (value) => !value || z.string().email().safeParse(value).success
);
const optionalOrderImagePath = z.string().trim().max(1_024).refine((value) => {
  return !value || isOrderImageObjectPath(value);
});
const orderSchema = z.object({
  id: databaseUuid,
  status: z.enum(['pending', 'in_production', 'shipped', 'completed', 'cancelled']),
  productName: z.string().trim().max(500),
  quantity: z.coerce.number().finite().int().min(0).max(10_000_000),
  boardAmount: amount,
  bomAmount: amount,
  unitPrice: amount,
  totalAmount: amount,
  notes: z.string().trim().max(10_000),
});
const createOrderSchema = orderSchema.omit({ id: true }).extend({
  customerName: z.string().trim().min(1).max(200),
  company: z.string().trim().max(300),
  country: z.string().trim().max(120),
  email: optionalEmail,
  phone: z.string().trim().max(100),
  image1: optionalOrderImagePath,
  image2: optionalOrderImagePath,
  image3: optionalOrderImagePath,
});

export async function createOrder(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(createOrderSchema.safeParse({
    customerName: formString(formData, 'customer_name'),
    company: formString(formData, 'company'),
    country: formString(formData, 'country'),
    email: formString(formData, 'email'),
    phone: formString(formData, 'phone'),
    productName: formString(formData, 'product_name'),
    quantity: formString(formData, 'quantity'),
    boardAmount: formString(formData, 'board_amount'),
    bomAmount: formString(formData, 'bom_amount'),
    unitPrice: formString(formData, 'unit_price'),
    totalAmount: formString(formData, 'total_amount'),
    status: formString(formData, 'status'),
    notes: formString(formData, 'notes'),
    image1: formString(formData, 'image_1'),
    image2: formString(formData, 'image_2'),
    image3: formString(formData, 'image_3'),
  }));

  const { error } = await supabase.from('orders').insert({
    customer_name: input.customerName,
    company: input.company || null,
    country: input.country || null,
    email: input.email || null,
    phone: input.phone || null,
    product_name: input.productName || null,
    quantity: input.quantity,
    board_amount: input.boardAmount,
    bom_amount: input.bomAmount,
    unit_price: input.unitPrice,
    total_amount: input.totalAmount,
    status: input.status,
    notes: input.notes || null,
    image_1: input.image1 || null,
    image_2: input.image2 || null,
    image_3: input.image3 || null,
  });
  assertMutationSucceeded(error);
  revalidatePath('/admin/orders');
  return { ok: true as const };
}

export async function updateOrder(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(orderSchema.safeParse({
    id: formString(formData, 'id'),
    status: formString(formData, 'status'),
    productName: formString(formData, 'product_name'),
    quantity: formString(formData, 'quantity'),
    boardAmount: formString(formData, 'board_amount'),
    bomAmount: formString(formData, 'bom_amount'),
    unitPrice: formString(formData, 'unit_price'),
    totalAmount: formString(formData, 'total_amount'),
    notes: formString(formData, 'notes'),
  }));

  const { error } = await supabase
    .from('orders')
    .update({
      status: input.status,
      product_name: input.productName || null,
      quantity: input.quantity,
      board_amount: input.boardAmount,
      bom_amount: input.bomAmount,
      unit_price: input.unitPrice,
      total_amount: input.totalAmount,
      notes: input.notes || null,
    })
    .eq('id', input.id);
  assertMutationSucceeded(error);
  redirect(`/admin/orders/${input.id}`);
}
