/* * */

/* * */

interface TimelineProps {
	children: React.ReactNode
}

/* * */

export function Timeline({ children }: TimelineProps) {
	return (
		<div style={{ borderLeft: '2px solid #ccc', marginLeft: 16, paddingLeft: 16 }}>{children}</div>
	);
}
