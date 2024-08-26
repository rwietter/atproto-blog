import type { ATProtoPort } from "@/ports/output/atprotoPort";

export const getPost = async (atproto: ATProtoPort, slug: string) => {
	const posts = atproto.getPost(slug);
	return posts;
};
