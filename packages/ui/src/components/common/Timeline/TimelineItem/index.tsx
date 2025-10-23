/* * */

import { TimelineItem as MantineTimelineItem, TimelineItemProps as MantineTimelineItemProps } from '@mantine/core';
import { Icon24Hours, IconCheck, IconHourglass, IconX } from '@tabler/icons-react';

/* * */

type Status = 'approved' | 'none' | 'pending' | 'rejected';

/* * */

interface TimelineItemWithStatusProps extends MantineTimelineItemProps {
	status: Status
}

export function TimelineItem({ status, ...props }: TimelineItemWithStatusProps) {
	//

	//
	// A. Setup Variables

	function getStatusBullet(status: Status) {
		if (status === 'approved') return <IconCheck color="var(--color-status-success-primary)" size={16} />;
		if (status === 'rejected') return <IconX color="var(--color-status-danger-primary)" size={16} />;
		if (status === 'pending') return <IconHourglass color="var(--color-status-warning-primary)" size={16} />;
		return <Icon24Hours color="var(--color-status-default)" size={16} />;
	}

	//
	// B. Render Components

	return <MantineTimelineItem bullet={status && getStatusBullet(status)} {...props} />;

	//
}
