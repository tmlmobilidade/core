'use client';

import {
	Popover as MantinePopover,
	PopoverDropdownProps as MantinePopoverDropdownProps,
	PopoverProps as MantinePopoverProps,
	PopoverTargetProps as MantinePopoverTargetProps,
} from '@mantine/core';
import { ComponentWrapper, Popover } from '@tmlmobilidade/ui';

export type PopoverProps = MantinePopoverProps;
export type PopoverTargetProps = MantinePopoverTargetProps;
export type PopoverDropdownProps = MantinePopoverDropdownProps;

export default function PopoverExample() {
	<ComponentWrapper>
		<Popover
		 Popover.Target = function PopoverTarget(props: PopoverTargetProps) {
	return <MantinePopover.Target {...props} />;
};

Popover.Dropdown = function PopoverDropdown(props: PopoverDropdownProps) {
	return <MantinePopover.Dropdown {...props} />;
/>
	</ComponentWrapper>;
}
