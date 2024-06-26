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

export const addPost = async (post: Omit<Post, 'id' | 'createdAt'>) => {
	try {
		let id = cuid();

		while ((await kv.get(['post', id])).versionstamp !== null) {
			// Post with id already exists, create new id
			id = cuid();
		}

        // Create the post object with the generated ID and current timestamp
        const newPost: Post = {
            id,
			createdAt: new Date().toISOString(),
            ...post,
        };

		return kv.set(['post', id], newPost);
	} catch {
		console.error("Error adding post:", Error);
        throw new Error("Failed to add post");
	}
};
export const deletePost = async (
	id: string,
) => {
	await kv.delete(['post', id])
}