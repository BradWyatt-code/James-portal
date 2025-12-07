// components/JamesNav.tsx
import Link from "next/link";

type JamesNavProps = {
  current?: "home" | "speak" | "his-story" | "letters"; // <-- put this back, make it optional
  className?: string;
};

export function JamesNav({ current, className }: JamesNavProps) {
  return (
    <nav className={className ?? "nav-links"}>
      {/* Home / James portal */}
      {current === "home" ? (
        <span className="current">James</span>
      ) : (
        <Link href="/">James</Link>
      )}

      <span>·</span>

      {/* His Story */}
      {current === "his-story" ? (
        <span className="current">His Story</span>
      ) : (
        <Link href="/his-story">His Story</Link>
      )}

      <span>·</span>

      {/* Speak */}
      {current === "speak" ? (
        <span className="current">Speak</span>
      ) : (
        <Link href="/speak">Speak</Link>
      )}

      <span>·</span>

      {/* Letters */}
      {current === "letters" ? (
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
