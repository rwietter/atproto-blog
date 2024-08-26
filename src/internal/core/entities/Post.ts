export type Post = {
	id: string; // rkey
	cid: string;
	title: string;
	content: string | undefined;
	createdAt: string;
	banner: string | undefined;
};
