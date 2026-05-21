import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5">
      <svg viewBox="0 0 32 32" width="32" height="32">
        <polygon points="16,3 29,27 3,27" fill="transparent" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="16" y="23" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="700" fontFamily="sans-serif">EP</text>
      </svg>
      <span className="font-semibold tracking-wide text-white">
        Event<span className="text-purple-500">Place</span>
      </span>
    </Link>
  )
}