import Image from 'next/image';

// The real BAS mark (public/brand/bas-logo.png), not a recreation.
export default function Logo({ size = 36, className = '' }) {
  return (
    <Image
      src="/brand/bas-logo.png"
      alt="BAS monogram"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
}
