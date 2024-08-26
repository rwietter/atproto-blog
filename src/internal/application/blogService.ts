import { Failure, Success } from "@/common/fp/Result";
import { getPost } from "@/core/usecases/getBlogPost";
import { getBlogPosts } from "@/core/usecases/getBlogPosts";
import { getProfile } from "@/core/usecases/getProfile";
import { atProtoAuthenticate } from "@/infra/api/atproto/agent";
import type { BlogPostPort } from "@/ports/output/blogPostPort";
import { getReadingTime } from "@/utils/getTimeReading";
import { getMdxSource } from "@/utils/mdx/serializeMdx";

export const createBlogService = (blogPostPort: BlogPostPort) => ({
	getBlogData: async () => {
		try {
			const posts = await getBlogPosts(blogPostPort);

			const postsFiltered = posts.filter(
				(post) => !post.content?.startsWith("NOT_LIVE"),
			);

			return Success({ posts: postsFiltered });
		} catch (error) {
			return Failure(new Error("Failed to get posts"));
		}
	},
	getBlogPost: async (slug: string) => {
		try {
			await atProtoAuthenticate();

			const [post, profile] = await Promise.all([
				getPost(blogPostPort, slug),
				getProfile(blogPostPort),
			]);

			const { readTime } = getReadingTime(post.content);
			const mdxSource = await getMdxSource(post.content);

			if (!mdxSource)
				return Failure(new Error("Is not possible parse post content"));

			return Success({
				post,
				profile,
				mdxSource,
				readingTime: readTime,
			});
		} catch (error) {
			console.log(error);
			return Failure(new Error("Failed to get posts"));
		}
	},
});
