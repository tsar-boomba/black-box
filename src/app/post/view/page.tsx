'use client';

import { BACKEND_URL } from '@/utils/consts';
import { fetcher } from '@/utils/fetcher';
import { Loader, Paper, Stack, Text, Title, rem } from '@mantine/core';
import useSWR from 'swr';
import { Post } from '../../../../shared';
import { marked } from 'marked';
import { useRef } from 'react';
import { title } from '../styles.css';

const getRandomInt = (min: number, max: number) => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

export default function ViewPost() {
	const { data } = useSWR<Post[]>(BACKEND_URL + '/post', fetcher);

	if (!data) {
		return (
			<Stack align='center' p='md'>
				<Loader size='xl' />
			</Stack>
		);
	}

	const post = data[getRandomInt(0, data.length)];

	return (
		<Stack align='center'>
			<Text component='h1' ta='center' className={title}>
				By {(post as any).author}
			</Text>
			<Text component='h1' ta='center' className={title}>
				{(post as any).occupation}
			</Text>

			<Paper
				dangerouslySetInnerHTML={{
					__html: marked.parse(post.content) as string,
				}}
			/>

			<Text fz={rem(24)} ta='center'>
				{post.quote}
			</Text>
		</Stack>
	);
}
