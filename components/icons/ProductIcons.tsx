export type ProductIconKey =
    | "auriculares"
    | "smartwatch"
    | "zapatillas"
    | "notebook"
    | "camara"

export const PRODUCT_ICONS: Record<ProductIconKey, React.ReactNode> = {
    auriculares: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
            <rect x="2" y="14" width="5" height="7" rx="2" />
            <rect x="17" y="14" width="5" height="7" rx="2" />
        </svg>
    ),
    smartwatch: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            <path d="M9 17v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3" />
            <rect x="6" y="7" width="12" height="10" rx="2.5" />
            <line x1="17" y1="10.5" x2="19" y2="10.5" />
        </svg>
    ),
    zapatillas: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 16v-3l3-1 3-4 4 3h4c3 0 6 1.5 6 4v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            <path d="M8 8v4" />
            <line x1="2" y1="18" x2="22" y2="18" />
        </svg>
    ),
    notebook: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="11" rx="1.2" />
            <path d="M2 18.5A1.5 1.5 0 0 1 3.5 17h17a1.5 1.5 0 0 1 1.5 1.5h0a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg>
    ),
    camara: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
            <circle cx="12" cy="13.5" r="3.3" />
        </svg>
    ),
}
