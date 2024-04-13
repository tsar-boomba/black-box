import React from 'react';
import {
	Switch,
	useMantineColorScheme,
	Tooltip,
	Group,
	rem,
} from '@mantine/core';
import { icon } from './ThemeToggle.css';
import { IconMoon, IconSun } from '@tabler/icons-react';

export const ThemeToggle = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});

	return (
		<Tooltip withinPortal withArrow label='Toggle Theme'>
			<Group my={rem(30)} justify='center'>
				<Switch
					checked={colorScheme === 'dark'}
					onChange={() => toggleColorScheme()}
					offLabel={<IconMoon className={icon} size={18} />}
					onLabel={<IconSun className={icon} size={18} />}
					size='md'
				/>
			</Group>
		</Tooltip>
	);
};
