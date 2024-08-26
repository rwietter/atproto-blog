import type { ATProtoPort } from "@/ports/output/atprotoPort";

export const getBlogPosts = async (atproto: ATProtoPort) => {
	const posts = await atproto.getPosts();

	const postsShortened = posts.map((post) => ({
		...post,
		content: post.content?.slice(0, 300),
	}));

	return postsShortened;
};
