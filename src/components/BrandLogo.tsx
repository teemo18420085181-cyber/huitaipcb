import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = 'h-9' }: BrandLogoProps) {
  return (
    <Image
      src="/logo-dark.svg"
      alt="Huitai Electronics brand logo"
      width={66}
      height={50}
      className={`${className} w-auto object-contain`}
    />
  );
}
