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
	const { data } = useSWR<Post[]>(BACKEND_URL + '/posts', fetcher);

	if (!data) {
		return (
			<Stack align='center' p='md'>
				<Loader size='xl' />
			</Stack>
		);
	}

	const post = data[getRandomInt(0, data.length)];

	if (!post) {
		return (
			<Stack align='center' p='md'>
				<Text component='h1' ta='center' className={title}>
					No posts
				</Text>
			</Stack>
		);
	}

	return (
		<Stack align='center' p='md'>
			<Text component='h1' ta='center' className={title}>
				By {post.author}
			</Text>
			<Text component='h1' ta='center' className={title}>
				{post.occupation}
			</Text>

			<Paper
				maw={600}
				p='md'
				color='white'
				dangerouslySetInnerHTML={{
					__html: marked.parse(post.content) as string,
				}}
			/>

			<Text component='h1' ta='center' className={title}>
				Inspirational Quote
			</Text>
			<Text fz={rem(24)} ta='center'>
				<em>&quot;{post.quote}&quot;</em>
			</Text>
		</Stack>
	);
}
