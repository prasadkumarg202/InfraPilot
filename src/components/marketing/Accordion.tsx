'use client';

import { useState } from 'react';

/**
 * Accordion.
 *
 * All panels stay in the DOM and animate via a grid-rows transition, so the
 * answers are present for crawlers and for in-page search even while closed.
 * Multiple items may be open at once — this is reference content, not a
 * navigation control.
 */

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  idPrefix = 'faq',
  defaultOpen = [],
}: {
  items: AccordionItem[];
  idPrefix?: string;
  defaultOpen?: number[];
}) {
  const [open, setOpen] = useState<Set<number>>(new Set(defaultOpen));

  const toggle = (index: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-trigger-${index}`;
        return (
          <div key={item.question} className="accordion__item">
            <h3>
              <button
                type="button"
                id={buttonId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.question}</span>
                <span className="accordion__marker" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              data-open={isOpen}
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
            >
              <div>
                <p className="accordion__content">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
