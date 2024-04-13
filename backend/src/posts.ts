import { Post } from '../../shared/index.ts';
import { cuid } from './deps.ts';
import { kv } from './kv.ts';

export const getPosts = async () => {
	const posts = [];

	for await (const post of kv.list<Post>({ prefix: ['post'] })) {
		posts.push(post);
	}

	return posts;
};

export const getPost = async (
	id: string,
): Promise<Deno.KvEntry<Post> | undefined> => {
	const entry = await kv.get<Post>(['post', id]);
	return entry.versionstamp !== null ? entry : undefined;
};

export const addPost = async (post: Omit<Post, 'id'>) => {
	let id = cuid();

	while ((await kv.get(['post', id])).versionstamp !== null) {
		// Post with id already exists, create new id
		id = cuid();
	}

	return kv.set(['post', id], { id, ...post } satisfies Post);
};
