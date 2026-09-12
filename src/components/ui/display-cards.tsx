import React from "react";
import { cn } from "@/lib/utils";
import { Award, ArrowUpRight, CheckCircle2 } from "lucide-react";

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
  title = "Conduct UX Research and Test Early Concepts",
  description = "Google / Coursera",
  date = "2025",
  link = "https://www.linkedin.com/in/humanshu-araspure/details/certifications/",
  iconClassName = "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  titleClassName = "text-white",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-[20rem] sm:w-[25rem] select-none flex-col justify-between rounded-[22px] border border-white/10 bg-[#121316]/95 backdrop-blur-xl p-6 transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:z-50 hover:scale-105 hover:border-emerald-500/40 hover:bg-[#16181d] group cursor-pointer",
        className
      )}
    >
      {/* Top Row: Icon Badge + CERTIFICATION label + Year Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={cn("inline-flex items-center justify-center w-9 h-9 rounded-full border shadow-[0_0_12px_rgba(16,185,129,0.15)]", iconClassName)}>
            {icon}
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">CERTIFICATION</span>
        </div>
        <span className="font-mono text-xs text-neutral-400 border border-white/10 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md">
          {date}
        </span>
      </div>

      {/* Main Title & Issuer */}
      <div className="my-5 space-y-1.5">
        <h4 className={cn("text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300 font-sans leading-snug", titleClassName)}>
          {title}
        </h4>
        <p className="text-xs sm:text-sm font-mono text-neutral-400">{description}</p>
      </div>

      {/* Bottom Row: Verified Credential Badge & External Link Arrow */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors pt-4 border-t border-white/10"
      >
        <span className="flex items-center gap-2 text-emerald-400 font-medium">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>VERIFY CREDENTIAL</span>
        </span>
        <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export function DisplayCards({ cards = [] }: { cards?: any[] }) {
  // Stacked deck positions matching Image 2 reference layout
  const stackPositions = [
    "[grid-area:stack] -translate-x-6 sm:-translate-x-32 -translate-y-6 sm:-translate-y-16 -rotate-6 hover:rotate-0 hover:-translate-y-20 z-10",
    "[grid-area:stack] -translate-x-4 sm:-translate-x-20 -translate-y-4 sm:-translate-y-10 -rotate-4 hover:rotate-0 hover:-translate-y-20 z-20",
    "[grid-area:stack] -translate-x-2 sm:-translate-x-8 -translate-y-2 sm:-translate-y-4 -rotate-2 hover:rotate-0 hover:-translate-y-20 z-30",
    "[grid-area:stack] translate-x-2 sm:translate-x-8 translate-y-2 sm:translate-y-4 rotate-2 hover:rotate-0 hover:-translate-y-20 z-40",
    "[grid-area:stack] translate-x-4 sm:translate-x-20 translate-y-4 sm:translate-y-10 rotate-4 hover:rotate-0 hover:-translate-y-20 z-50",
    "[grid-area:stack] translate-x-6 sm:translate-x-32 translate-y-6 sm:translate-y-16 rotate-6 hover:rotate-0 hover:-translate-y-20 z-60",
  ];

  return (
    <div className="w-full flex items-center justify-center py-8 px-4">
      <div className="grid [grid-template-areas:'stack'] place-items-center min-h-[380px] sm:min-h-[440px] max-w-4xl w-full">
        {cards.map((card, index) => (
          <DisplayCard
            key={index}
            title={card.title}
            description={card.issuer}
            date={card.year}
            link={card.credentialUrl}
            icon={card.icon || <Award className="size-4 text-emerald-400" />}
            className={cn(
              stackPositions[index % stackPositions.length]
            )}
          />
        ))}
      </div>
    </div>
  );
}
