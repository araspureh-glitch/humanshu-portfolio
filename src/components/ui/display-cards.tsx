import React from "react";
import { cn } from "@/lib/utils";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  link?: string;
  iconClassName?: string;
  titleClassName?: string;
}

export function DisplayCard({
  className,
  icon = <Award className="size-4 text-emerald-400" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "2025",
  link = "https://www.linkedin.com/in/humanshu-araspure/details/certifications/",
  iconClassName = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-48 w-[22rem] sm:w-[26rem] select-none flex-col justify-between rounded-2xl border border-white/20 bg-[#121215]/95 backdrop-blur-xl px-6 py-5 transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:z-50 hover:scale-105 hover:border-white/50 hover:bg-[#18181c] group cursor-pointer",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={cn("relative inline-flex items-center justify-center rounded-full p-2 border", iconClassName)}>
            {icon}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">CERTIFICATION</span>
        </div>
        <span className="font-mono text-xs text-neutral-400 border border-white/10 px-2.5 py-0.5 rounded-full bg-white/5">
          {date}
        </span>
      </div>

      <div className="space-y-1.5 pt-1">
        <h4 className={cn("text-base sm:text-lg font-medium tracking-tight line-clamp-2 transition-colors group-hover:text-emerald-300 font-sans", titleClassName)}>
          {title}
        </h4>
        <p className="text-xs font-mono text-neutral-400 line-clamp-1">{description}</p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors pt-3 border-t border-white/10"
      >
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          <span>Verify Credential</span>
        </span>
        <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export function DisplayCards({ cards = [] }: { cards?: any[] }) {
  // Pre-configured stacked layout offsets for display cards
  const stackPositions = [
    "[grid-area:stack] -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-10",
    "[grid-area:stack] translate-x-4 sm:translate-x-12 translate-y-6 sm:translate-y-8 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-20",
    "[grid-area:stack] translate-x-8 sm:translate-x-24 translate-y-12 sm:translate-y-16 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-30",
    "[grid-area:stack] translate-x-12 sm:translate-x-36 translate-y-18 sm:translate-y-24 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-40",
    "[grid-area:stack] translate-x-16 sm:translate-x-48 translate-y-24 sm:translate-y-32 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-50",
    "[grid-area:stack] translate-x-20 sm:translate-x-60 translate-y-30 sm:translate-y-40 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-12 z-60",
  ];

  return (
    <div className="w-full flex items-center justify-center py-16 px-4">
      <div className="grid [grid-template-areas:'stack'] place-items-center min-h-[380px] sm:min-h-[460px] max-w-4xl w-full">
        {cards.map((card, index) => (
          <DisplayCard
            key={index}
            title={card.title}
            description={card.issuer}
            date={card.year}
            link={card.credentialUrl}
            icon={card.icon}
            className={cn(
              stackPositions[index % stackPositions.length]
            )}
          />
        ))}
      </div>
    </div>
  );
}
