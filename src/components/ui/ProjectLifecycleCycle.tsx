"use client";

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  ClipboardList,
  Factory,
  FileText,
  Headphones,
  Inbox,
  Package,
  Truck,
  Wrench,
} from "lucide-react";

export type LifecycleCycleStep = { title: string; caption: string; Icon: LucideIcon };

const DEFAULT_STEPS: LifecycleCycleStep[] = [
  { title: "Quote", caption: "Scope & sizing", Icon: FileText },
  { title: "Order confirmed", caption: "Commercial sign-off", Icon: BadgeCheck },
  { title: "Product getting ready", caption: "Build & QA", Icon: Package },
  { title: "Shipped", caption: "Logistics", Icon: Truck },
  { title: "Installation", caption: "Site fit-off", Icon: Wrench },
  { title: "Service", caption: "Ongoing support", Icon: Headphones },
];

/** Food industry “Precision pipeline” — matches enquiry-to-install flow. */
export const FOOD_PRECISION_PIPELINE_STEPS: LifecycleCycleStep[] = [
  { title: "Quote", caption: "System config", Icon: FileText },
  { title: "Purchase order", caption: "Approval", Icon: ClipboardList },
  { title: "Order received", caption: "Processing", Icon: Inbox },
  { title: "Product prepared", caption: "Fabrication", Icon: Factory },
  { title: "Shipped", caption: "Logistics", Icon: Truck },
  { title: "Installation", caption: "Final handover", Icon: Wrench },
];

const DEFAULT_FOOTNOTE =
  "Full checkpoints and timing are confirmed in your quote pack and commissioning schedule.";

export default function ProjectLifecycleCycle({
  className = "",
  id,
  steps = DEFAULT_STEPS,
  footnote = DEFAULT_FOOTNOTE,
}: {
  className?: string;
  id?: string;
  steps?: LifecycleCycleStep[];
  footnote?: string;
}) {
  const n = steps.length;

  return (
    <div id={id} className={`relative ${className}`}>
      <div
        className="lifecycle-cycle-ring pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        aria-hidden
      />

      <ol className="relative space-y-0 md:hidden">
        <div className="lifecycle-timeline-track absolute bottom-4 left-[2.25rem] top-4 w-px" aria-hidden />
        {steps.map((step, i) => {
          const Icon = step.Icon;
          return (
            <li key={`${step.title}-${i}`} className="relative flex gap-4 pb-10 pl-1 last:pb-0">
              <div className="relative z-10 shrink-0">
                <span
                  className="lifecycle-node-pulse absolute inset-0 rounded-full bg-[#FC8347]/12"
                  style={{ animationDelay: `${i * 0.45}s` }}
                  aria-hidden
                />
                <div
                  className="lifecycle-node relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border-2 border-[#FC8347]/40 bg-white shadow-[0_8px_28px_rgba(5,17,37,0.07)]"
                  style={{ animationDelay: `${i * 0.45}s` }}
                >
                  <Icon className="h-7 w-7 text-[#051125]" strokeWidth={1.35} aria-hidden />
                </div>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#FC8347] font-body text-[0.65rem] font-bold text-white shadow-sm">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 pt-2">
                <h3 className="font-headline text-base font-bold !text-[#051125]">{step.title}</h3>
                <p className="mt-0.5 font-body text-sm text-[#584237]">{step.caption}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden md:block md:-mx-2 md:overflow-x-auto md:px-2 md:pb-1 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="flex w-full min-w-[52rem] items-start justify-between gap-1 lg:min-w-0 lg:gap-2">
          {steps.map((step, i) => {
            const Icon = step.Icon;
            return (
              <div key={`${step.title}-${i}`} className="contents">
                <div className="flex w-[5.5rem] shrink-0 flex-col items-center text-center lg:w-[6.5rem] xl:w-[7rem]">
                  <div className="relative">
                    <span
                      className="lifecycle-node-pulse absolute inset-0 rounded-full bg-[#FC8347]/12"
                      style={{ animationDelay: `${i * 0.45}s` }}
                      aria-hidden
                    />
                    <div
                      className="lifecycle-node relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-2 border-[#FC8347]/40 bg-white shadow-[0_10px_36px_rgba(5,17,37,0.09)] lg:h-[5.25rem] lg:w-[5.25rem]"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    >
                      <Icon
                        className="h-8 w-8 text-[#051125] lg:h-9 lg:w-9"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    </div>
                    <span className="absolute -right-0.5 -top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#FC8347] font-body text-xs font-bold text-white shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-headline text-xs font-bold leading-tight !text-[#051125] lg:text-sm">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-body text-[0.65rem] leading-snug text-[#584237] lg:text-xs">{step.caption}</p>
                </div>
                {i < n - 1 ? (
                  <div
                    className="lifecycle-flow-segment mx-0.5 mt-[2.35rem] min-h-[3px] min-w-[8px] flex-1 self-start rounded-full lg:mt-[2.6rem]"
                    style={{ animationDelay: `${i * 0.35}s` }}
                    aria-hidden
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {footnote ? (
        <p className="mt-8 text-center font-body text-xs text-[#584237] md:mt-10">{footnote}</p>
      ) : null}
    </div>
  );
}
