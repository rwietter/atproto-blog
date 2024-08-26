/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import type { Post } from "@/core/entities/Post";
import type { WhtwndBlogEntryRecord } from "./atproto";
import { uriToRkey } from "./uriToRkey";

export const whtwndBlogEntryRecordToView = ({
	uri,
	cid,
	value,
}: {
	uri: string;
	cid: string;
	value: WhtwndBlogEntryRecord;
}): Post => {
	return {
		id: uriToRkey(uri),
		cid,
		title: value.title,
		content: value.content,
		createdAt: value.createdAt,
		banner: value.ogp?.url ?? undefined,
	};
};
