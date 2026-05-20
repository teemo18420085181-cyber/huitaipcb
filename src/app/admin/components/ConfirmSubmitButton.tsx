'use client';

import { useFormStatus } from 'react-dom';

export default function ConfirmSubmitButton({
  label,
  confirmMessage,
  className,
}: {
  label: string;
  confirmMessage: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
      className={className}
    >
      {pending ? '处理中...' : label}
    </button>
  );
}
