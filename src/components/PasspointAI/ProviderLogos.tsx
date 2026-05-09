interface LogoProps {
  className?: string;
  size?: number;
}

export function ClaudeLogo({ className = '', size = 16 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.903 11.006L12.478 2.17a.545.545 0 0 0-.956 0L7.097 11.006a.545.545 0 0 0 .478.8h8.85a.545.545 0 0 0 .478-.8Z"
        fill="#D97757"
      />
      <path
        d="M17.597 12.494H6.403a.545.545 0 0 0-.478.8l4.425 8.836a.545.545 0 0 0 .956 0l.694-1.386 3.731-7.45a.545.545 0 0 0-.134-.8Z"
        fill="#D97757"
      />
      <path
        d="M12.694 20.744l4.425-8.25H12v9.636l.694-1.386Z"
        fill="#D97757"
      />
    </svg>
  );
}

export function GeminiLogo({ className = '', size = 16 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C12 2 14.5 7.5 17 10C19.5 12.5 22 12 22 12C22 12 19.5 12.5 17 15C14.5 17.5 12 22 12 22C12 22 9.5 17.5 7 15C4.5 12.5 2 12 2 12C2 12 4.5 12.5 7 10C9.5 7.5 12 2 12 2Z"
        fill="url(#gemini_gradient)"
      />
      <defs>
        <linearGradient
          id="gemini_gradient"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AutoRouteLogo({ className = '', size = 16 }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
