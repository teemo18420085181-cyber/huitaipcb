'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';

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
    trackEvent('submit_rfq_attempt', { file_count: files.length, location: 'contact_form' });

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
      trackEvent('submit_rfq', { file_count: files.length, location: 'contact_form' });
      trackEvent('generate_lead', { file_count: files.length, method: 'contact_form' });
    } catch (err) {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border border-line rounded-2xl p-12 text-center" translate="no">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-brand-green/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-brand-green" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-semibold text-brand-primary mb-2">
          Thank you!
        </h2>
        <p className="text-ink-muted leading-relaxed max-w-[480px] mx-auto">
          We&apos;ve received your inquiry and a confirmation email is on its way.
          Our engineering team will review your files and respond within{' '}
          <strong>24 hours</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-line rounded-2xl p-6 md:p-10 space-y-5" translate="no">
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
        <label className="block text-xs font-medium text-brand-primary tracking-wide mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Briefly describe your project: quantity, target lead time, any specifications. Example: '50pcs prototype, 4-layer board with BGA, needs functional test, target delivery in 2 weeks.'"
          className="w-full px-4 py-3 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-brand-primary tracking-wide mb-2">
          Testing Requirements
        </label>
        <textarea
          name="testing_requirements"
          rows={3}
          placeholder="Functional test, ICT, firmware flashing, inspection report, sample approval requirements..."
          className="w-full px-4 py-3 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
        />
      </div>

      {/* File upload area */}
      <div>
        <label className="block text-xs font-medium text-brand-primary tracking-wide mb-2">
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
              ? 'border-brand-yellow bg-brand-yellow/5'
              : 'border-line hover:border-brand-primary/40'
          }`}
        >
          <Upload size={28} className="mx-auto text-brand-primary mb-2" strokeWidth={2} />
          <div className="text-sm font-medium text-brand-primary">
            Drop files here or click to browse
          </div>
          <div className="text-xs text-ink-muted mt-1">
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
                className="flex items-center gap-3 px-3 py-2 bg-bg-muted rounded-lg"
              >
                <FileText size={16} className="text-brand-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{f.name}</div>
                  <div className="text-[11px] text-ink-muted">
                    {formatSize(f.size)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-ink-muted hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2.5 text-xs text-ink-muted cursor-pointer pt-2">
        <input
          type="checkbox"
          name="consent"
          value="true"
          required
          className="mt-0.5 accent-brand-primary"
        />
        <span>
          I agree to be contacted regarding this inquiry. My information will be
          used solely to provide a quote and project communication, never shared
          with third parties. See our{' '}
          <a href="/privacy" className="text-brand-primary underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        onClick={() => trackEvent('click_submit_rfq_button', { file_count: files.length, location: 'contact_form' })}
        className="w-full bg-brand-primary text-white font-semibold py-3.5 rounded-lg hover:bg-brand-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
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
      <label className="block text-xs font-medium text-brand-primary tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm border border-line rounded-lg focus:outline-none focus:border-brand-primary transition-colors"
      />
    </div>
  );
}
