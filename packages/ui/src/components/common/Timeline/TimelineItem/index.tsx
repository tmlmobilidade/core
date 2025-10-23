/* * */

/* * */

interface VerticalTimelineItemProps {
	children: React.ReactNode
}

/* * */
export function TimelineItem({ children }: VerticalTimelineItemProps) {
	return (
		<div style={{ marginBottom: 32, position: 'relative' }}>
			<div style={{ background: '#888', borderRadius: 6, height: 12, left: -25, position: 'absolute', top: 0, width: 12 }} />
			<div>{children}</div>
		</div>
	);
}
