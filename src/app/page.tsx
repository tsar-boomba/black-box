'use client';

import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { control, description, inner, title, wrapper } from './styles.css';
import Link from 'next/link';

export default function Home() {
	const theme = useMantineTheme();

	return (
		<div className={wrapper}>
			<Container size={700} className={inner}>
				<Stack align='center' justify='center'>
					<Text
						component='h1'
						variant='gradient'
						className={title}
						gradient={{
							from: theme.colors[theme.primaryColor][2],
							to: theme.colors[theme.primaryColor][6],
							deg: 75,
						}}
					>
						Black Box
					</Text>
					<Text className={description} c='white'>
						An open mentorship platform connecting High-School students with
						peers and mentors.
					</Text>
					<Group>
						<Button
							component={Link}
							className={control}
							size='xl'
							fz={rem(24)}
							href='/post/create'
						>
							Create
						</Button>
						<Button
							component={Link}
							className={control}
							size='xl'
							fz={rem(24)}
							href='/post/view'
						>
							View
						</Button>
					</Group>
				</Stack>
			</Container>
		</div>
	);
}
