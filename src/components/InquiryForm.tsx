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
  const [dragOver, setDragOver] = useState(false);

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
    <form onSubmit={handleSubmit} className="bg-cc-carbon-2 border border-cc-line rounded-2xl p-6 md:p-10 space-y-5" translate="no">
      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="Your Name *" name="name" required />
        <FormField label="Email *" name="email" type="email" required />
        <FormField label="Company" name="company" />
        <FormField label="Country" name="country" />
        <FormField label="Phone / WhatsApp" name="phone" type="tel" />
        <FormField label="Project Type" name="project_type" placeholder="Prototype, low-volume, turnkey PCBA..." />
        <FormField label="Quantity" name="quantity" placeholder="50 pcs, 500 pcs, pilot run..." />
      </div>

      <div>
        <label className="block text-xs font-medium text-cc-ink tracking-wide mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Briefly describe your project: quantity, target lead time, any specifications. Example: '50pcs prototype, 4-layer board with BGA, needs functional test, target delivery in 2 weeks.'"
          className="w-full px-4 py-3 text-sm border border-cc-line bg-cc-carbon-3 text-cc-ink placeholder:text-cc-ink-mute/60 rounded-lg focus:outline-none focus:border-cc-copper/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-cc-ink tracking-wide mb-2">
          Testing Requirements
        </label>
        <textarea
          name="testing_requirements"
          rows={3}
          placeholder="Functional test, ICT, firmware flashing, inspection report, sample approval requirements..."
          className="w-full px-4 py-3 text-sm border border-cc-line bg-cc-carbon-3 text-cc-ink placeholder:text-cc-ink-mute/60 rounded-lg focus:outline-none focus:border-cc-copper/60 transition-colors"
        />
      </div>

      {/* File upload area */}
      <div>
        <label className="block text-xs font-medium text-cc-ink tracking-wide mb-2">
          Project Files (Gerber, BOM, drawings, photos)
        </label>
        <div
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
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragOver
              ? 'border-cc-copper bg-cc-copper/5'
              : 'border-cc-line hover:border-cc-copper/40'
          }`}
        >
          <Upload size={28} className="mx-auto text-cc-ink mb-2" strokeWidth={2} />
          <div className="text-sm font-medium text-cc-ink">
            Drop files here or click to browse
          </div>
          <div className="text-xs text-cc-ink-mute mt-1">
            Up to 10 files, 25MB each. Gerber, BOM, PDF, Excel, images, drawings accepted.
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
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 bg-cc-carbon rounded-lg"
              >
                <FileText size={16} className="text-cc-ink flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{f.name}</div>
                  <div className="text-[11px] text-cc-ink-mute">
                    {formatSize(f.size)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-cc-ink-mute hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2.5 text-xs text-cc-ink-mute cursor-pointer pt-2">
        <input
          type="checkbox"
          name="consent"
          value="true"
          required
          className="mt-0.5 accent-cc-copper"
        />
        <span>
          I agree to be contacted regarding this inquiry. My information will be
          used solely to provide a quote and project communication, never shared
          with third parties. See our{' '}
          <a href="/privacy" className="text-cc-ink underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full cc-copper-fill font-semibold py-3.5 rounded-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload size={16} strokeWidth={2.5} />
            Send RFQ
          </>
        )}
      </button>
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
      <label className="block text-xs font-medium text-cc-ink tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm border border-cc-line bg-cc-carbon-3 text-cc-ink placeholder:text-cc-ink-mute/60 rounded-lg focus:outline-none focus:border-cc-copper/60 transition-colors"
      />
    </div>
  );
}
