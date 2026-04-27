/** Parses `translateX(...px)` from an element's inline `transform` (best-effort). */
export function getTranslateXPx(transform: string): number {
	if (!transform || transform === 'none') return 0;
	const match = transform.match(/translateX\(([-+]?[\d.]+)px\)/);
	return match ? Number(match[1]) : 0;
}
