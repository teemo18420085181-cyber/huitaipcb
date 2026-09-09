import { Children, isValidElement, type ReactNode } from 'react';

function elements(children: ReactNode) {
  return Children.toArray(children).filter(isValidElement<{ children?: ReactNode }>);
}

/** Opt-in editorial layout: keep comparisons readable without four narrow mobile columns. */
export default function KnowledgeComparisonTable({ children }: { children: ReactNode }) {
  const sections = elements(children);
  const head = sections.find((section) => section.type === 'thead');
  const body = sections.find((section) => section.type === 'tbody');
  const headerRow = elements(head?.props.children)[0];
  const headers = elements(headerRow?.props.children).map((cell) => cell.props.children);
  const rows = elements(body?.props.children).map((row) => elements(row.props.children));
  const canStack = headers.length > 1 && rows.length > 0 && rows.every((row) => row.length === headers.length);

  return (
    <>
      <div className={`${canStack ? 'hidden sm:block ' : ''}overflow-hidden rounded-xl border border-cc-line`}>
        <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">{children}</table>
      </div>
      {canStack && (
        <div className="divide-y divide-cc-line overflow-hidden rounded-xl border border-cc-line sm:hidden">
          {rows.map((cells, rowIndex) => (
            <div key={rowIndex} className="p-3">
              <p className="mb-3 font-semibold leading-5 text-cc-ink">{cells[0].props.children}</p>
              <dl className="space-y-3 text-xs leading-5">
                {cells.slice(1).map((cell, columnIndex) => (
                  <div key={columnIndex} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-3 [overflow-wrap:anywhere]">
                    <dt className="font-medium text-cc-ink">{headers[columnIndex + 1]}</dt>
                    <dd>{cell.props.children}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
