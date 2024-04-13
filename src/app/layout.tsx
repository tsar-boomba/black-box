'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ReactNode } from 'react';
import { Layout } from '@/components/Layout';
import { ModalsProvider } from '@mantine/modals';
import { theme } from '@/theme';

const MyApp = ({ children }: { children?: ReactNode }) => {
	return (
		<html>
			<head>
				<ColorSchemeScript
					defaultColorScheme='light'
					forceColorScheme='light'
				/>
				<title>Black Box</title>
				<meta name='title' content='Black Box' />
				<meta
					name='description'
					content='A platform for black students in STEM to empower each other.'
				/>
				<link rel='icon' href='/cube.svg' type='image/svg+xml' />

				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://black-box.igamble.dev/' />
				<meta property='og:title' content='Black Box' />
				<meta
					property='og:description'
					content='Full-stack developer with real world experience'
				/>
				<meta property='og:image' content='TODO' />

				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://black-box.igamble.dev/' />
				<meta property='twitter:title' content='Black Box' />
				<meta
					property='twitter:description'
					content='A platform for black students in STEM to empower each other.'
				/>
				<meta property='twitter:image' content='TODO' />

				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
				<style>{'html { scroll-behavior: smooth; }'}</style>
			</head>

			<body>
				<MantineProvider
					defaultColorScheme='light'
					forceColorScheme='light'
					theme={theme}
				>
					<ModalsProvider>
						<Layout>{children}</Layout>
						<Notifications />
					</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	);
};

export default MyApp;
