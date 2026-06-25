import Image from "next/image";

export default function Thumbnail({ src, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-gray-800 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          No image
        </div>
      )}
    </div>
  );
}
