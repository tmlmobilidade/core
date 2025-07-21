'use client';

import {
	Popover as MantinePopover,
	PopoverDropdownProps as MantinePopoverDropdownProps,
	PopoverProps as MantinePopoverProps,
	PopoverTargetProps as MantinePopoverTargetProps,
} from '@mantine/core';
import { Button } from '@mantine/core';
import { ComponentWrapper, Popover } from '@tmlmobilidade/ui';

export type PopoverProps = MantinePopoverProps;
export type PopoverTargetProps = MantinePopoverTargetProps;
export type PopoverDropdownProps = MantinePopoverDropdownProps;

export default function PopoverExample() {
	return (
		<ComponentWrapper>
			<Popover>
				<Popover.Target>
					<Button>Open Popover</Button>
				</Popover.Target>
				<Popover.Dropdown>
					<div>Add dropdown content</div>
				</Popover.Dropdown>
			</Popover>
		</ComponentWrapper>
	);
}
