import Link from "next/link";

export default function Pagination({ basePath, page, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-4 mt-12">
      {page > 1 && (
        <Link href={`${basePath}?page=${page - 1}`} className="text-lime-400">
          ← Prev
        </Link>
      )}
      <span className="text-gray-500">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Link href={`${basePath}?page=${page + 1}`} className="text-lime-400">
          Next →
        </Link>
      )}
    </div>
  );
}
