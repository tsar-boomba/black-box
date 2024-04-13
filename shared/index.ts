/**
 * Contains shared types and function between frontend and backend. Make sure not to use any Deno or Node.js specific stuff in here
 */

export type Post = {
	id: string;
	content: string;
	quote: string;
	/**
	 * ISO formatted date
	 */
	createdAt: string;
};
