'use client';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Markdown } from 'tiptap-markdown';
import {
	Button,
	Group,
	MantineProvider,
	Paper,
	Stack,
	Text,
	TextInput,
	Textarea,
	Title,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { title as mainTitle } from '@/app/styles.css';
import { useState } from 'react';
import { title } from '../styles.css';
import { BACKEND_URL } from '@/utils/consts';
import { Post } from '../../../../shared';
import { useRouter } from 'next/navigation';

const QUOTE_LIMIT = 60;

export default function CreatePost() {
	const theme = useMantineTheme();
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);

	const [author, setAuthor] = useState('');
	const [occupation, setOccupation] = useState('');
	const [quote, setQuote] = useState('');

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Markdown,
		],
		autofocus: true,
		content: '',
	});

	return (
		<Stack align='center' justify='center' p='md'>
			<Text
				component='h1'
				variant='gradient'
				className={mainTitle}
				gradient={{
					from: theme.colors[theme.primaryColor][2],
					to: theme.colors[theme.primaryColor][6],
					deg: 75,
				}}
			>
				Create A Post
			</Text>
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
				Compose
			</Text>
			<Paper>
				<RichTextEditor editor={editor}>
					<RichTextEditor.Toolbar sticky stickyOffset={60}>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.ClearFormatting />
							<RichTextEditor.Highlight />
							<RichTextEditor.Code />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.ColorPicker colors={[]} />{' '}
							<RichTextEditor.Color color='' />
							<RichTextEditor.UnsetColor />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Undo />
							<RichTextEditor.Redo />
						</RichTextEditor.ControlsGroup>
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
			</Paper>

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
				Inspire
			</Text>

			<Group>
				<TextInput
					label='Author'
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
					styles={{
						label: {
							color: 'white',
						},
					}}
				/>
				<TextInput
					label='Occupation'
					value={occupation}
					onChange={(e) => setOccupation(e.target.value)}
					styles={{
						label: {
							color: 'white',
						},
					}}
				/>
			</Group>
			<Textarea
				label={`Inspirational Quote (${QUOTE_LIMIT - quote.length} chars left)`}
				styles={{
					label: {
						color: 'white',
					},
				}}
				value={quote}
				onChange={(e) => {
					const text = e.target.value;
					if (text.length > QUOTE_LIMIT) return;
					setQuote(text);
				}}
			/>
			<Button
				fz={rem(20)}
				c='gray'
				onClick={async () => {
					const content = editor?.storage.markdown.getMarkdown() as string;
					console.log(content);
					if (!content || !author || !occupation || !quote) return;

					setSubmitting(true);
					try {
						const res = await fetch(BACKEND_URL + '/post', {
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify({
								content,
								quote,
								author,
								occupation,
							} satisfies Omit<Post, 'id' | 'createdAt'> & any),
						});

						if (!res.ok) {
							console.error('Req failed!');
						} else {
							// Success, now go to somewhere else
							router.push('/');
						}

						setSubmitting(false);
					} catch (e) {
						console.error(e);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				Submit
			</Button>
		</Stack>
	);
}
