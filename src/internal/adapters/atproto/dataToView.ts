/**
 * By @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import type {
	WhtwndBlogEntryRecord,
	WhtwndBlogEntryView,
} from "@/adapters/atproto/atproto";
import { uriToRkey } from "./uriToRkey";

export const whtwndBlogEntryRecordToView = ({
	uri,
	cid,
	value,
}: {
	uri: string;
	cid: string;
	value: WhtwndBlogEntryRecord;
}): WhtwndBlogEntryView => {
	return {
		rkey: uriToRkey(uri),
		cid,
		title: value.title,
		content: value.content,
		createdAt: value.createdAt,
		banner: value.ogp?.url ?? undefined,
	};
};
