// components/JamesNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type JamesNavProps = {
  className?: string;
};

export function JamesNav({ className = "nav-links" }: JamesNavProps) {
  const pathname = usePathname();

  const isCurrent = (path: string | string[]) => {
    const paths = Array.isArray(path) ? path : [path];
    return paths.includes(pathname);
  };

  return (
    <nav className={className}>
      {/* Home / James portal */}
      {isCurrent("/") ? (
        <span className="current">James</span>
      ) : (
        <Link href="/">James</Link>
      )}

      <span>·</span>

      {/* His Story */}
      {isCurrent("/his-story") ? (
        <span className="current">His Story</span>
      ) : (
        <Link href="/his-story">His Story</Link>
      )}

      <span>·</span>

      {/* Speak */}
      {isCurrent("/speak") ? (
        <span className="current">Speak</span>
      ) : (
        <Link href="/speak">Speak</Link>
      )}

      <span>·</span>

      {/* Letters */}
      {isCurrent("/letters") ? (
        <span className="current">Letters</span>
      ) : (
        <Link href="/letters">Letters</Link>
      )}

      <span>·</span>

      {/* Clara (external) */}
      <a href="https://clara.bw8.org" target="_blank" rel="noreferrer">
        Clara
      </a>

      <span>·</span>

      {/* Liang (external) */}
      <a href="https://liang.bw8.org" target="_blank" rel="noreferrer">
        Liang (梁美蓮)
      </a>
    </nav>
  );
}
