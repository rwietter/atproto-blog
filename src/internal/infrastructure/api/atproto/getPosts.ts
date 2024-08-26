/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import type { Post } from "@/core/entities/Post";
import type { WhtwndBlogEntryRecord } from "@/infra/api/atproto/atproto";
import { atpAgent } from "./agent";
import { whtwndBlogEntryRecordToView } from "./dataToView";

export const getPosts = async (cursor: string | undefined): Promise<Post[]> => {
	const repo = process.env.ATP_IDENTIFIER as string;

	const res = await atpAgent.com.atproto.repo.listRecords({
		collection: "com.whtwnd.blog.entry",
		repo,
		cursor,
	});

	if (!res.success) {
		throw new Error("Failed to get posts.");
	}

	const posts = res.data.records.map((data) =>
		whtwndBlogEntryRecordToView({
			uri: data.uri,
			cid: data.cid?.toString() ?? "",
			value: data.value as WhtwndBlogEntryRecord,
		}),
	);

	return posts;
};
