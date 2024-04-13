export const fetcher = <JSON>(key: string): Promise<JSON> =>
	fetch(key).then((res) => {
		if (!res.ok) {
			throw new Error(`${res.status}: ${res.statusText}`);
		}

		return res.json();
	});
