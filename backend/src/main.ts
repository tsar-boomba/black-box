import nhttp from 'https://deno.land/x/nhttp@1.3.25/mod.ts';
import { cors } from './deps.ts';
import { isProduction } from './utils.ts';
import { kv } from './kv.ts';

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

app.get('/post', () => {});

app.get('/post/:id', () => {});

app.post('/post', () => {});

app.listen(8000, () => {
	console.log('Listening on http://localhost:8000');
});
