interface BrandLogoProps {
  className?: string;
}

export const BrandLogo = ({ className = "" }: BrandLogoProps) => {
  return (
    <span className={`inline-flex items-center gap-2 text-[#ff385c] ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8">
        <path
          d="M16 2.25c-2.16 0-4.16 1.18-5.23 3.08L3.84 18.25a9.2 9.2 0 0 0-1.09 4.33A9.25 9.25 0 0 0 12 31.83c1.5 0 2.95-.37 4.2-1.05 1.26.68 2.7 1.05 4.2 1.05a9.25 9.25 0 0 0 9.25-9.25c0-1.5-.38-2.98-1.1-4.33L21.23 5.33A5.96 5.96 0 0 0 16 2.25Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11.1a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.35"
        />
      </svg>
      <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.03em] lowercase">
        airbnb
      </span>
    </span>
  );
};