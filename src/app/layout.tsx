'use client';

import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';
import { Layout } from '@/components/Layout';
import { ModalsProvider } from '@mantine/modals';
import { theme } from '@/theme';

const MyApp = ({ children }: { children?: ReactNode }) => {
	return (
		<html>
			<head>
				<ColorSchemeScript defaultColorScheme='auto' />
				<title>Black Box</title>
				<meta name='title' content='Black Box' />
				<meta
					name='description'
					content='A platform for black students in STEM to empower each other.'
				/>
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💣</text></svg>'
				/>

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
				<MantineProvider defaultColorScheme='auto' theme={theme}>
					<ModalsProvider>
						<Layout>{children}</Layout>
					</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	);
};

export default MyApp;
