'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';

function getQuantityRange(quantity: FormDataEntryValue | null) {
  const value = typeof quantity === 'string' ? quantity : '';
  const firstNumber = value.match(/\d+/)?.[0];
  if (!firstNumber) return 'unspecified';

  const amount = Number(firstNumber);
  if (amount <= 10) return '1-10';
  if (amount <= 50) return '11-50';
  if (amount <= 100) return '51-100';
  if (amount <= 500) return '101-500';
  if (amount <= 1000) return '501-1000';
  return '1000+';
}

export default function InquiryForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formStartedRef = useRef(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFormFocus = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackEvent('form_start', { page_path: '/contact', form_name: 'rfq_contact_form' });
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const arr = Array.from(newFiles).slice(0, 10 - files.length);
    setFiles((prev) => [...prev, ...arr]);
    if (arr.length > 0) {
      trackEvent('upload_file', {
        file_count: arr.length,
        total_file_count: files.length + arr.length,
        location: 'contact_form',
      });
    }
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    files.forEach((f) => formData.append('files', f));
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
      const projectType = formData.get('project_type');
      const quantity = formData.get('quantity');
      void trackEvent('contact_form_submit', {
        page_path: '/contact',
        form_name: 'rfq_contact_form',
        project_type: typeof projectType === 'string' && projectType.trim() ? projectType.trim().slice(0, 80) : 'unspecified',
        quantity_range: getQuantityRange(quantity),
        has_attachment: files.length > 0,
      });
      void trackEvent('generate_lead', {
        page_path: '/contact',
        form_name: 'rfq_contact_form',
        lead_type: 'pcba_quote',
      });
    } catch (err) {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-cc-carbon-2 border border-cc-line rounded-2xl p-12 text-center" translate="no">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-cc-signal/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-cc-signal" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-semibold text-cc-ink mb-2">
          Thank you!
        </h2>
        <p className="text-cc-ink-mute leading-relaxed max-w-[480px] mx-auto">
          We&apos;ve received your inquiry and a confirmation email is on its way.
          Our engineering team will review your files and respond within{' '}
          <strong>24 hours</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      id="quote-form"
      onSubmit={handleSubmit}
      onFocusCapture={handleFormFocus}
      className="space-y-5 rounded-2xl border border-cc-line bg-cc-carbon-2 p-6 shadow-2xl shadow-black/20 md:p-8"
      translate="no"
    >
      <div className="border-b border-cc-line pb-5">
        <div className="font-mono-cc mb-2 text-[10px] font-semibold tracking-[0.18em] text-cc-copper-soft">
          QUICK RFQ
        </div>
        <h2 className="font-display text-2xl font-bold text-cc-ink">Start with the essentials</h2>
        <p className="mt-2 text-sm leading-relaxed text-cc-ink-mute">
          Name, email, a short project note, and any available files are enough to begin.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Your Name *" name="name" required />
        <FormField label="Email *" name="email" type="email" required />
        <div className="md:col-span-2">
          <FormField label="Quantity" name="quantity" placeholder="50 pcs, 500 pcs, pilot run..." />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium tracking-wide text-cc-ink">
          Project Brief *
        </label>
        <textarea
          name="message"
          id="message"
          required
          rows={4}
          placeholder="What are you building, what quantity do you need, and what should we review first?"
          className="w-full rounded-lg border border-cc-line bg-cc-carbon-3 px-4 py-3 text-sm text-cc-ink transition-colors placeholder:text-cc-ink-mute/60 focus:border-cc-copper/60 focus:outline-none"
        />
      </div>

      <div id="project-files">
        <label className="mb-2 block text-xs font-medium tracking-wide text-cc-ink">
          Project Files <span className="font-normal text-cc-ink-mute">(recommended)</span>
        </label>
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload project files"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              trackEvent('click_file_upload_button', { location: 'contact_form' });
              fileInputRef.current?.click();
            }
          }}
          onClick={() => {
            trackEvent('click_file_upload_button', { location: 'contact_form' });
            fileInputRef.current?.click();
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-cc-copper/50 ${
            dragOver
              ? 'border-cc-copper bg-cc-copper/5'
              : 'border-cc-copper/35 bg-cc-carbon/35 hover:border-cc-copper/70'
          }`}
        >
          <Upload size={28} className="mx-auto mb-2 text-cc-copper-soft" strokeWidth={2} />
          <div className="text-sm font-semibold text-cc-ink">Upload Gerber, BOM, drawings, or photos</div>
          <div className="mt-1 text-xs text-cc-ink-mute">
            Drop files here or click to browse. Up to 10 files, 25MB each.
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            accept=".zip,.rar,.7z,.pdf,.xlsx,.xls,.csv,.gbr,.ger,.drl,.nc,.brd,.sch,.png,.jpg,.jpeg,.txt"
          />
        </div>

        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((f, i) => (
              <div key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-lg bg-cc-carbon px-3 py-2">
                <FileText size={16} className="flex-shrink-0 text-cc-copper-soft" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-cc-ink">{f.name}</div>
                  <div className="text-[11px] text-cc-ink-mute">{formatSize(f.size)}</div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => removeFile(i)}
                  className="text-cc-ink-mute transition-colors hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <details className="group rounded-xl border border-cc-line bg-cc-carbon/30">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-cc-ink transition-colors hover:text-cc-copper-soft">
          <span className="inline-flex items-center gap-2">
            <span className="text-cc-copper-soft transition-transform group-open:rotate-45">+</span>
            Add company, phone, project type, or testing details
          </span>
        </summary>
        <div className="grid gap-5 border-t border-cc-line p-4 md:grid-cols-2">
          <FormField label="Company" name="company" />
          <FormField label="Country" name="country" />
          <FormField label="Phone / WhatsApp" name="phone" type="tel" />
          <FormField label="Project Type" name="project_type" placeholder="Prototype, low-volume, turnkey PCBA..." />
          <div className="md:col-span-2">
            <label htmlFor="testing_requirements" className="mb-2 block text-xs font-medium tracking-wide text-cc-ink">
              Testing Requirements
            </label>
            <textarea
              name="testing_requirements"
              id="testing_requirements"
              rows={3}
              placeholder="Functional test, ICT, firmware flashing, inspection report, sample approval requirements..."
              className="w-full rounded-lg border border-cc-line bg-cc-carbon-3 px-4 py-3 text-sm text-cc-ink transition-colors placeholder:text-cc-ink-mute/60 focus:border-cc-copper/60 focus:outline-none"
            />
          </div>
        </div>
      </details>

      <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs text-cc-ink-mute">
        <input type="checkbox" name="consent" value="true" required className="mt-0.5 accent-cc-copper" />
        <span>
          I agree to be contacted regarding this inquiry. My information will be used solely for
          quotation and project communication. See our{' '}
          <a href="/privacy" className="text-cc-ink underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="cc-copper-fill flex w-full items-center justify-center gap-2 rounded-lg py-3.5 font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload size={16} strokeWidth={2.5} />
            Send RFQ for Engineering Review
          </>
        )}
      </button>
      <p className="text-center text-[11px] tracking-wide text-cc-ink-mute">
        Reply target within 24 hours / NDA available on request
      </p>
    </form>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-cc-ink tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm border border-cc-line bg-cc-carbon-3 text-cc-ink placeholder:text-cc-ink-mute/60 rounded-lg focus:outline-none focus:border-cc-copper/60 transition-colors"
      />
    </div>
  );
}
