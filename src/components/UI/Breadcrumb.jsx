import Link from "next/link";
import { ChevronRight } from "react-feather";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-lime-400" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-lime-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="w-4 h-4" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
