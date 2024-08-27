import { Err, Ok, type Result, isErr } from "@/common/fp/Result";
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
}): Result<Post> => {
	const id = uriToRkey(uri);

	if (isErr(id)) return Err(new Error("Failed to convert uri to rkey"));

	return Ok({
		id: id.value,
		cid,
		title: value.title,
		content: value.content,
		createdAt: value.createdAt,
		banner: value.ogp?.url ?? undefined,
	});
};
