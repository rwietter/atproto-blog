import type { Post } from "@/core/entities/Post";
import type { Profile } from "@/core/entities/Profile";

export type ATProtoPort = {
	getPosts: () => Promise<Post[]>;
	getProfile: () => Promise<Profile>;
	getPost: (slug: string) => Promise<Post>;
};
