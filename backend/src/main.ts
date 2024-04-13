import nhttp from 'https://deno.land/x/nhttp@1.3.25/mod.ts';
import { cors } from './deps.ts';
import { isProduction } from './utils.ts';
import { kv } from './kv.ts';
import { deletePost, getPost } from './posts.ts';
import { getPosts } from './posts.ts';
import { addPost } from './posts.ts';

if (!isProduction) {
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

app.get('/', () => {
	console.log("root")
});

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
app.delete('/posts/:id', (rev) => {
	console.log(rev.params.id)
	deletePost(rev.params.id)
	return "removed"
})

app.listen(8000);
