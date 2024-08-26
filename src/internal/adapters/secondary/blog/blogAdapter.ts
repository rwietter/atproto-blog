import type { Post } from "@/core/entities/Post";
import type { Profile } from "@/core/entities/Profile";
import { getPost, getPosts, getProfile } from "@/infra/api/atproto";
import type { ATProtoPort } from "@/ports/output/atprotoPort";

export const blogAdapter = (): ATProtoPort => ({
	getPosts: async (): Promise<Post[]> => {
		const posts = await getPosts(undefined);
		return posts.map((post) => ({
			id: post.id,
			title: post.title,
			content: post.content,
			createdAt: post.createdAt,
			cid: post.cid,
			banner: post.banner,
		}));
	},

	getProfile: async (): Promise<Profile> => {
		const profile = getProfile();
		return profile;
	},

	getPost: async (slug: string): Promise<Post> => {
		const post = await getPost(slug);
		return post;
	},
});
