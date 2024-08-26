import type { Post } from "@/core/entities/Post";
import type { Profile } from "@/core/entities/Profile";
import Redis from "ioredis";

const redisClient = new Redis(
	process.env.REDIS_URL || "redis://localhost:6379",
);

export const getCachedPosts = async (): Promise<Post[] | null> => {
	const res = await redisClient.get("posts");
	if (!res) {
		return null;
	}
	return JSON.parse(res);
};

export const setCachedPosts = async (posts: Post[]): Promise<void> => {
	await redisClient.set("posts", JSON.stringify(posts), "EX", 3600);
};

export const getCachedPost = async (id: string): Promise<Post | null> => {
	const res = await redisClient.get(id);
	if (!res) {
		return null;
	}
	return JSON.parse(res);
};

export const setCachedPost = async (post: Post): Promise<void> => {
	await redisClient.set(post.id, JSON.stringify(post), "EX", 3600);
};

export const getCachedProfile = async (): Promise<Profile | null> => {
	const res = await redisClient.get("profile");
	if (!res) {
		return null;
	}
	return JSON.parse(res);
};

export const setCachedProfile = async (profile: Profile) => {
	await redisClient.set("profile", JSON.stringify(profile), "EX", 3600);
};
