import type { BlogPostPort } from "@/ports/output/blogPostPort";

export const getBlogPosts = async (blogPostPort: BlogPostPort) => {
	const posts = await blogPostPort.getPosts();

	const postsShortened = posts.map((post) => ({
		...post,
		content: post.content?.slice(0, 300),
	}));

	return postsShortened;
};
