import Image from 'next/image';

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100/90 z-50">
      <Image src="/logo_small.svg" alt="Loading" width={100} height={100} className="animate-spin" />
    </div>
  );
}