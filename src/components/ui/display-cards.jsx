import React from "react";
import { cn } from "@/lib/utils";
import { Award, ExternalLink } from "lucide-react";

export function DisplayCard({
  className,
  icon = <Award className="size-4 text-emerald-400" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "2025",
  link = "https://www.linkedin.com/in/humanshu-araspure/details/certifications/",
  iconClassName = "text-emerald-400",
  titleClassName = "text-white",
}) {
  return (
    <div
      className={cn(
        "relative flex h-44 w-full max-w-sm -skew-y-[4deg] select-none flex-col justify-between rounded-xl border border-white/15 bg-neutral-900/80 backdrop-blur-md px-6 py-5 transition-all duration-500 hover:skew-y-0 hover:scale-105 hover:border-white/40 hover:bg-neutral-900 hover:shadow-2xl group",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("relative inline-block rounded-full bg-white/10 p-2", iconClassName)}>
            {icon}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">CERTIFICATION</span>
        </div>
        <span className="font-mono text-xs text-neutral-400">{date}</span>
      </div>

      <div className="space-y-1">
        <h4 className={cn("text-base font-medium tracking-tight line-clamp-2 transition-colors group-hover:text-emerald-300", titleClassName)}>
          {title}
        </h4>
        <p className="text-xs font-mono text-neutral-400 line-clamp-1">{description}</p>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors"
      >
        <span>Verify Credential</span>
        <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
}

export function DisplayCards({ cards = [] }) {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-6 py-8">
      {cards.map((card, index) => (
        <DisplayCard
          key={index}
          title={card.title}
          description={card.issuer}
          date={card.year}
          link={card.credentialUrl}
          icon={card.icon}
          className={cn(
            index % 3 === 0 && "-skew-y-[3deg] hover:skew-y-0",
            index % 3 === 1 && "skew-y-[2deg] hover:skew-y-0",
            index % 3 === 2 && "-skew-y-[2deg] hover:skew-y-0"
          )}
        />
      ))}
    </div>
  );
}
