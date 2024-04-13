import React, { useEffect, useRef, useState } from 'react';
import {
	Container,
	Group,
	Burger,
	Text,
	useMantineTheme,
	Collapse,
	Paper,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { ThemeToggle } from './ThemeToggle';
import {
	desktopOnly,
	header,
	mobileMenu,
	mobileOnly,
	root,
	title,
	linkActive,
	linkClass,
} from './Header.css';
import { IconExternalLink } from '@tabler/icons-react';

interface HeaderSimpleProps {
	links: { link: string; label: string }[];
}

const CLICK_OUT_EVENTS: (keyof DocumentEventMap)[] = [
	'touchstart',
	'mousedown',
];

export const Header: React.FC<HeaderSimpleProps> = ({ links }) => {
	const [opened, toggleOpened] = useToggle([false, true]);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(links[0].link);
	const theme = useMantineTheme();

	useEffect(() => {
		const handler = () => toggleOpened(false);

		const listener = (e: Event) => {
			!menuRef.current?.contains(e.target as Node) &&
				!buttonRef.current?.contains(e.target as Node) &&
				handler();
		};

		CLICK_OUT_EVENTS.forEach((ev) => document.addEventListener(ev, listener));
		return () =>
			CLICK_OUT_EVENTS.forEach((ev) =>
				document.removeEventListener(ev, listener),
			);
	}, [menuRef, buttonRef]);

	const items = links.map((link) => (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			key={link.label}
			href={link.link}
			target={link.link.startsWith('http') ? '_blank' : undefined}
			rel={link.link.startsWith('http') ? 'norefrerer' : undefined}
			className={`${linkClass} ${link.link === active ? linkActive : ''}`}
			onClick={(e) => {
				e.preventDefault();
				setActive(link.link);
				toggleOpened(false);
				location.href = link.link;
			}}
		>
			{link.label} {link.label === 'Blog' && <IconExternalLink />}
		</a>
	));

	return (
		<Paper shadow='md' component='header' className={root}>
			<Container className={header}>
				<Text
					component='h1'
					variant='gradient'
					className={title}
					gradient={{
						from: theme.colors[theme.primaryColor][8],
						to: theme.colors[theme.primaryColor][5],
						deg: 75,
					}}
					ta='center'
				>
					Black Box
				</Text>

				<Group component='nav' gap={5} className={desktopOnly}>
					{items}
				</Group>

				<Burger
					opened={opened}
					ref={buttonRef}
					onClick={() => toggleOpened()}
					className={mobileOnly}
					size='sm'
				/>

				<Group wrap='nowrap'>
					<ThemeToggle />
				</Group>

				<nav className={mobileMenu} ref={menuRef}>
					<Collapse in={opened}>{items}</Collapse>
				</nav>
			</Container>
		</Paper>
	);
};
