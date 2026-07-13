"use client";

/**
 * Draws (a half of) a tilted glowing ellipse ribbon. Rendering the "back"
 * half behind the photo and the "front" half above it makes the ring read
 * as if it physically threads through the photo, Saturn-ring style.
 */
export function OrbitalRing({ className = "", tilt = -14, id = "a", part = "full" }) {
  const gradId = `orbitalRingGrad-${id}`;
  const glowId = `orbitalRingGlow-${id}`;

  // Half-ellipse paths for ellipse cx=200 cy=200 rx=188 ry=128.
  const backPath = "M 12 200 A 188 128 0 0 1 388 200"; // upper half
  const frontPath = "M 12 200 A 188 128 0 0 0 388 200"; // lower half

  const showGuide = part !== "front";
  const showBack = part === "back" || part === "full";
  const showFront = part === "front" || part === "full";

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9de600" stopOpacity="0" />
          <stop offset="50%" stopColor="#e8ffc2" stopOpacity="1" />
          <stop offset="100%" stopColor="#9de600" stopOpacity="0" />
        </linearGradient>
        <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`rotate(${tilt} 200 200)`}>
        {showGuide && (
          <ellipse
            cx="200"
            cy="200"
            rx="188"
            ry="128"
            stroke={`url(#${gradId})`}
            strokeWidth="2"
            opacity="0.3"
          />
        )}
        {showBack && (
          <path
            d={backPath}
            stroke={`url(#${gradId})`}
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.55"
            filter={`url(#${glowId})`}
          />
        )}
        {showFront && (
          <path
            d={frontPath}
            stroke={`url(#${gradId})`}
            strokeWidth="13"
            strokeLinecap="round"
            filter={`url(#${glowId})`}
          />
        )}
      </g>
    </svg>
  );
}
