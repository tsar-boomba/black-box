import nhttp from 'https://deno.land/x/nhttp@1.3.25/mod.ts';
import { cors } from './deps.ts';
import { isProduction } from './utils.ts';
import { kv } from './kv.ts';
import { deletePost, getPost } from './posts.ts';
import { getPosts } from './posts.ts';
import { addPost } from './posts.ts';
import { Post } from '../../shared/index.ts';

if (!isProduction) {
	console.log('Clearing KV...');
	for await (const entry of kv.list({ prefix: [] })) {
		await kv.delete(entry.key);
	}
}

const app = nhttp({
	env: isProduction ? 'production' : 'development',
});

app.use(
	cors({
		origin: '*',
	}),
);

app.get('/', () => 'hello world!');

app.get('/posts', async () => {
	const posts = await getPosts();
	return posts.map(({ value }) => value);
});

app.get('/posts/:id', (req) => {
	return getPost(req.params.id);
});

app.post('/posts', (rev) => {
	return addPost(rev.body as Omit<Post, 'id' | 'createdAt'>);
});
app.delete('/posts/:id', (rev) => {
	console.log(rev.params.id)
	deletePost(rev.params.id)
	return "removed"
})

app.listen(8000, () => {
	console.log('Listening on http://localhost:8000');
});
