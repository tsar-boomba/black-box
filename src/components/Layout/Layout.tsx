import { ReactNode } from 'react';
import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<Header
				links={[
					{
						label: 'Post',
						link: '/post',
					},
				]}
			/>
			<main>{children}</main>
		</div>
	);
};
