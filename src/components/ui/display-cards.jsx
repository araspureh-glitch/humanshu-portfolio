import React from "react";
import { cn } from "@/lib/utils";
import { Award, Check } from "lucide-react";

export function DisplayCard({
  className,
  icon = <Award className="size-5 text-[#34d399]" />,
  title = "Conduct UX Research and Test Early Concepts",
  description = "Google / Coursera",
  date = "2025",
  link = "https://www.linkedin.com/in/humanshu-araspure/details/certifications/",
  iconClassName = "bg-[#1b3a2f] border-[#275947] text-[#34d399]",
  titleClassName = "text-white",
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative flex h-auto min-h-[15.5rem] w-[22rem] sm:w-[28rem] select-none flex-col justify-between rounded-[26px] border border-white/10 bg-[#121417] backdrop-blur-xl pl-8 pr-6 py-6 transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:z-50 hover:scale-105 hover:border-emerald-500/50 hover:bg-[#16181c] group cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Left side green vertical accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 rounded-l-[26px] bg-gradient-to-b from-[#4ade80] via-[#10b981] to-[#059669]" />

      {/* Right side overlapping green geometric ribbon graphic */}
      <svg
        className="absolute right-0 top-0 h-full w-36 pointer-events-none z-0 rounded-r-[26px]"
        viewBox="0 0 140 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Dark green background curve */}
        <path
          d="M140 65C85 105 85 165 140 205V240H140V0Z"
          fill="#1b4d3e"
          fillOpacity="0.8"
        />
        {/* Layer 2: Bright green foreground gradient curve */}
        <path
          d="M140 85C95 120 95 175 140 200V240H140V0Z"
          fill="url(#emeraldRibbonGrad)"
        />
        <defs>
          <linearGradient id="emeraldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content Container (z-10 to stay above background graphic) */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        
        {/* Top Row: Icon Badge + CERTIFICATION label + Year Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={cn("inline-flex items-center justify-center w-11 h-11 rounded-full border shadow-[0_0_15px_rgba(52,211,153,0.2)]", iconClassName)}>
              {icon}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-300 font-semibold">CERTIFICATION</span>
          </div>
          <span className="font-sans font-medium text-xs text-neutral-300 border border-neutral-700/80 px-4 py-1 rounded-full bg-[#1e2124] backdrop-blur-md">
            {date}
          </span>
        </div>

        {/* Main Title & Issuer */}
        <div className="space-y-1.5 pt-2">
          <h4 className={cn("text-xl sm:text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-300 font-sans leading-snug pr-8", titleClassName)}>
            {title}
          </h4>
          <p className="text-sm font-sans text-neutral-400 font-medium">{description}</p>
        </div>

        {/* Divider Line & Upper Right Arrow */}
        <div className="relative border-t border-neutral-800/80 pt-3">
          <span className="absolute right-0 -top-3 text-neutral-400 text-xs font-sans group-hover:text-white transition-colors">↗</span>
          
          {/* Bottom Row: Verified Credential & Signature */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full border-2 border-[#34d399] flex items-center justify-center text-[#34d399] bg-[#121417]">
                <Check className="size-3.5 text-[#34d399] stroke-[3]" />
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#34d399] font-bold">VERIFY CREDENTIAL</span>
            </div>

            {/* Signature Mark SVG */}
            <svg className="w-10 h-5 text-neutral-400 fill-none stroke-current stroke-2" viewBox="0 0 60 30">
              <path d="M5 20 C 15 5, 20 25, 30 10 C 35 25, 45 15, 55 20" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

      </div>
    </a>
  );
}

export function DisplayCards({ cards = [] }) {
  // Original centered stacked layout offsets for display cards
  const stackPositions = [
    "[grid-area:stack] -translate-x-5 sm:-translate-x-30 -translate-y-5 sm:-translate-y-20 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-10",
    "[grid-area:stack] -translate-x-3 sm:-translate-x-18 -translate-y-3 sm:-translate-y-12 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-20",
    "[grid-area:stack] -translate-x-1 sm:-translate-x-6 -translate-y-1 sm:-translate-y-4 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-30",
    "[grid-area:stack] translate-x-1 sm:translate-x-6 translate-y-1 sm:translate-y-4 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-40",
    "[grid-area:stack] translate-x-3 sm:translate-x-18 translate-y-3 sm:translate-y-12 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-50",
    "[grid-area:stack] translate-x-5 sm:translate-x-30 translate-y-5 sm:translate-y-20 -skew-y-[6deg] hover:skew-y-0 hover:-translate-y-24 z-60",
  ];

  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
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
