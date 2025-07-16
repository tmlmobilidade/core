'use client';

import { Button, ComponentWrapper, Menu } from '@tmlmobilidade/ui';

export default function MenuExample() {
	return (
		<ComponentWrapper>
			<Menu>
				<Menu.Target>
					<Button>Menu</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>Options : </Menu.Label>
					<Menu.Item>Option 1</Menu.Item>
					<Menu.Item>Option 2</Menu.Item>
					<Menu.Item>Option 3</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</ComponentWrapper>
	);
}
