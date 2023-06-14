
export function sanitizeString (str: string): string {
	return str.replace(/(<([^>]+)>)/gi, "").trim()
}