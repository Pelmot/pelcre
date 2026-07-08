interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="17" />
      <line x1="7.5" y1="7" x2="7.5" y2="7.05" />
      <path d="M11.5 17v-4.2c0-1.4 1-2.3 2.2-2.3s2.05.9 2.05 2.3V17" />
    </svg>
  );
}

export function XIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <line x1="7.5" y1="7.5" x2="16.5" y2="16.5" />
      <line x1="16.5" y1="7.5" x2="7.5" y2="16.5" />
    </svg>
  );
}

export function BehanceIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="2.5" y="7.5" width="8" height="9" rx="1.5" />
      <line x1="2.5" y1="11.5" x2="10.5" y2="11.5" />
      <path d="M14.5 12.2c0-2.3 1.6-3.7 3.5-3.7 2.1 0 3.5 1.6 3.5 4v.4h-6.3c0 1.8 1.1 2.8 2.8 2.8 1.1 0 1.9-.4 2.4-1.1" />
      <line x1="14.7" y1="6.2" x2="19.8" y2="6.2" />
    </svg>
  );
}
