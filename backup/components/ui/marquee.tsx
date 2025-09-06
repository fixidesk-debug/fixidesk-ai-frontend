import React, { PropsWithChildren } from "react";

type MarqueeProps = PropsWithChildren<{
  speedSeconds?: number;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
  duplication?: number; // how many times to duplicate children in a single track
}>;

export function Marquee({
  children,
  speedSeconds = 28,
  pauseOnHover = true,
  className = "",
  trackClassName = "",
  duplication = 2,
}: MarqueeProps) {
  const items = React.Children.toArray(children);
  const duplicated = Array.from({ length: duplication }, () => items).flat();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <style>{`
        @keyframes ui-marquee-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ui-animate-marquee {
          animation: ui-marquee-x ${speedSeconds}s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ui-animate-marquee { animation: none !important; transform: none !important; }
        }
      `}</style>
      <div className={`flex ui-animate-marquee ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''} ${trackClassName}`}>
        {duplicated.map((child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </div>
    </div>
  );
}


