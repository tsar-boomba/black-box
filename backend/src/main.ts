import nhttp from 'https://deno.land/x/nhttp@1.3.25/mod.ts';
import { cors } from './deps.ts';
import { isProduction } from './utils.ts';
import { kv } from './kv.ts';
import { getPost } from './posts.ts';
import { getPosts } from './posts.ts';
import { addPost } from './posts.ts';

if (!isProduction) {
	console.log('Clearing KV...');
	for await (const entry of kv.list({ prefix: [''] })) {
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

app.get('/posts', getPosts);

app.get('/posts/:id', (req,res) => {
	let id = req.params.id
	//getPost(rev.body.string);
	console.log(id)
	return getPost(id)
});

app.post('/posts', (rev) => {
	console.log(rev.body)
	return addPost(rev.body.string)
});

app.listen(8000, () => {
	console.log('Listening on http://localhost:8000');
});
