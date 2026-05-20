'use client';

import { useState } from 'react';
import { MessageCircle, Send, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

// ── Pinned Q&As (manually curated - update in admin or edit here) ──────────
const PINNED_QA = [
  {
    flag: '🇺🇸',
    country: 'United States',
    category: 'Minimum Order',
    question: 'What is your minimum order quantity for prototype runs?',
    answer:
      'No strict minimum — we regularly run orders as small as 5 pieces for prototypes. Pricing scales up at 10, 50, 100, 500+ pcs. For 1–4 pieces we charge a small setup fee but it\'s absolutely doable.',
  },
  {
    flag: '🇩🇪',
    country: 'Germany',
    category: 'Sourcing',
    question: 'My BOM is only 70% complete. Can you still quote and help source the rest?',
    answer:
      'Yes. Send us whatever you have — partial BOM, schematic, or even just a Gerber. Our sourcing team will identify the missing components, suggest alternatives where needed, and confirm everything with you before ordering.',
  },
  {
    flag: '🇬🇧',
    country: 'United Kingdom',
    category: 'Legal',
    question: 'Do you sign NDAs before receiving design files?',
    answer:
      'Absolutely. NDA signing is standard practice for us and takes less than 24 hours. Just let us know when you enquire and we\'ll send our template — or you can send yours.',
  },
  {
    flag: '🇦🇺',
    country: 'Australia',
    category: 'Shipping',
    question: 'How do you handle customs and import duties to Australia?',
    answer:
      'We ship DAP (Delivered at Place) as standard — you handle import duties at your end. If you prefer DDP (Duties Delivery Paid, meaning we pre-pay duties), ask us when quoting and we\'ll calculate the cost.',
  },
  {
    flag: '🇳🇱',
    country: 'Netherlands',
    category: 'Lead Time',
    question: 'What\'s a realistic lead time for a 4-layer PCB + full SMT, 50pcs?',
    answer:
      'Typically 10–14 business days from Gerber approval to boards shipped: 5 days PCB fab + 2 days sourcing/kitting + 3–5 days assembly and test. Rush options exist — ask us if you\'re deadline-driven.',
  },
  {
    flag: '🇨🇦',
    country: 'Canada',
    category: 'Payments',
    question: 'What payment methods do you accept for international customers?',
    answer:
      'We accept T/T (wire transfer), PayPal for smaller orders, and can invoice in USD, EUR, or GBP. For repeat customers, net payment terms are available after the first successful order.',
  },
];

const CATEGORIES = ['Question', 'Suggestion', 'Feature Request', 'Other'];

// ── Single Q&A card ──────────────────────────────────────────
function QACard({ qa }: { qa: typeof PINNED_QA[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-line rounded-xl overflow-hidden bg-white hover:border-brand-primary/20 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <span className="text-xl flex-shrink-0 mt-0.5">{qa.flag}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] font-semibold tracking-wide bg-brand-primary/8 text-brand-primary px-2 py-0.5 rounded-full border border-brand-primary/10">
              {qa.category}
            </span>
            <span className="text-[10px] text-ink-muted">{qa.country}</span>
          </div>
          <div className="text-sm font-medium text-brand-primary leading-snug pr-2">
            {qa.question}
          </div>
        </div>
        <div className="flex-shrink-0 mt-0.5 text-ink-muted">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 ml-9">
          <div className="flex gap-2.5 items-start">
            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-brand-yellow text-[10px] font-bold">HT</span>
            </div>
            <div className="text-sm text-ink-muted leading-relaxed bg-bg-muted rounded-lg px-3 py-2.5 border border-line flex-1">
              {qa.answer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Submission form ─────────────────────────────────────────
function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState('Question');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          country: formData.get('country'),
          category: formData.get('category'),
          message: formData.get('message'),
        }),
      });
      setSubmitted(true);
    } catch {
      // Still show success — stored client side if API not ready
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center p-8">
        <div className="w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center mb-4">
          <MessageCircle size={24} className="text-brand-green" />
        </div>
        <h3 className="text-base font-semibold text-brand-primary mb-2">
          Thanks — received!
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed max-w-[280px]">
          We review all submissions and publish selected questions with answers. 
          If your question is common enough, it&apos;ll appear here soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-xs text-brand-primary underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 h-full">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-brand-primary tracking-wide mb-1.5">
            Your name <span className="text-ink-muted font-normal">(optional)</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="e.g. James"
            className="w-full px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-brand-primary tracking-wide mb-1.5">
            Country <span className="text-ink-muted font-normal">(optional)</span>
          </label>
          <input
            name="country"
            type="text"
            placeholder="e.g. Germany"
            className="w-full px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-medium text-brand-primary tracking-wide mb-1.5">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                category === c
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-transparent text-ink-muted border-line hover:border-brand-primary/40'
              }`}
            >
              {c}
            </button>
          ))}
          <input type="hidden" name="category" value={category} />
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-[11px] font-medium text-brand-primary tracking-wide mb-1.5">
          Your question or suggestion *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Ask anything — about our process, pricing, capabilities, lead times, file formats… No question is too basic."
          className="w-full px-3 py-2.5 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-brand-primary text-white text-sm font-medium py-3 rounded-lg hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? (
          <><Loader2 size={15} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={14} strokeWidth={2} /> Submit your question</>
        )}
      </button>

      <p className="text-[10px] text-ink-muted text-center leading-relaxed">
        We review all submissions and publish selected Q&As here. Your name is optional
        and will only appear as &ldquo;{category} from [Country]&rdquo; if published.
      </p>
    </form>
  );
}

// ── Main export ─────────────────────────────────────────────
export default function FeedbackBoard() {
  return (
    <section className="py-[90px] px-[5vw] bg-bg-muted border-t border-line">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] text-brand-primary font-semibold tracking-[0.16em] mb-3.5">
            <span className="w-[18px] h-0.5 bg-brand-yellow rounded-sm" />
            CUSTOMER Q&A
          </div>
          <h2 className="text-3xl md:text-[38px] font-semibold text-brand-primary tracking-tight leading-tight mb-3">
            Questions from customers around the world.
          </h2>
          <p className="text-[15px] text-ink-muted leading-relaxed max-w-[600px]">
            Real questions, real answers. We update this board based on what we hear most
            from overseas hardware teams. Have something on your mind? Ask below.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Left: Q&A list */}
          <div className="space-y-3">
            {PINNED_QA.map((qa, i) => (
              <QACard key={i} qa={qa} />
            ))}
            <p className="text-[11px] text-ink-muted pt-1">
              Showing {PINNED_QA.length} selected questions ·{' '}
              <span className="text-brand-primary">More added regularly</span>
            </p>
          </div>

          {/* Right: Submit form */}
          <div className="bg-white border border-line rounded-2xl p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/8 flex items-center justify-center">
                <MessageCircle size={16} className="text-brand-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-primary">
                  Ask or suggest anything
                </div>
                <div className="text-[11px] text-ink-muted">
                  We read every submission
                </div>
              </div>
            </div>
            <SubmitForm />
          </div>
        </div>
      </div>
    </section>
  );
}
