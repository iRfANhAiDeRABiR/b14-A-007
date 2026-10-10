import type { ReactNode } from "react";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function SectionHeading({
  id,
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
      <div className="flex flex-col gap-1">
        <h2
          id={id}
          className="text-xl sm:text-2xl font-bold text-[#1d271f] tracking-tight"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm sm:text-base text-[#1d271f]/70">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
