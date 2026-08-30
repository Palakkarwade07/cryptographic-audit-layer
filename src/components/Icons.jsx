export function ShieldIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5l7.5 3.2v5.4c0 4.4-3 8.3-7.5 9.6-4.5-1.3-7.5-5.2-7.5-9.6V6.7L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8.8 12.2l2.2 2.2 4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LayoutIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function TableIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 10h16M10 10v9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function LinkIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.2 12h3.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function ScanIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 9V6.5A1.5 1.5 0 016.5 5H9M15 5h2.5A1.5 1.5 0 0119 6.5V9M19 15v2.5a1.5 1.5 0 01-1.5 1.5H15M9 19H6.5A1.5 1.5 0 015 17.5V15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function AlertIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4.8L21 19.5H3L12 4.8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4.2M12 16.8h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function MenuIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
