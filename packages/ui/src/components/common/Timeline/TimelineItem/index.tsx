/* * */

import { TimelineItem as MantineTimelineItem, TimelineItemProps as MantineTimelineItemProps } from '@mantine/core';
import { Icon24Hours, IconCheck } from '@tabler/icons-react';

/* * */

type Status = 'approved' | 'nonwe' | 'pending' | 'rejected';

/* * */

interface TimelineItemWithStatusProps extends MantineTimelineItemProps {
	status: Status
}

export function TimelineItem({ status, ...props }: TimelineItemWithStatusProps) {
	//

	//
	// A. Setup Variables

	function getStatusBullet(status: Status) {
		if (status === 'approved') return <IconCheck color="var(--color-status-success-primary)" size={20} />;
		if (status === 'rejected') return <Icon24Hours color="var(--color-status-danger-primary)" size={20} />;
		if (status === 'pending') return <Icon24Hours color="var(--color-status-warning-primary)" size={20} />;
		return <Icon24Hours color="var(--color-status-default)" size={20} />;
	}

	//
	// B. Render Components

	return <MantineTimelineItem bullet={status && getStatusBullet(status)} {...props} />;

	//
}
