import { ReactNode } from 'react';
import { Header } from './Header';
import { Paper } from '@mantine/core';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Paper mih='100vh' bg='black' radius={0}>
			{/* <Header
				links={[
					{
						label: 'Post',
						link: '/post',
					},
				]}
			/> */}
			<main>{children}</main>
		</Paper>
	);
};
