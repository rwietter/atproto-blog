import { Err, Ok, type Result, isErr } from "@/common/fp/Result";
import type { Post } from "@/core/entities/Post";
import type { WhtwndBlogEntryRecord } from "@/infra/api/atproto/atproto";
import { atpAgent } from "./agent";
import { whtwndBlogEntryRecordToView } from "./dataToView";

export const getPosts = async (
	cursor: string | undefined,
): Promise<Result<Post[]>> => {
	const repo = process.env.ATP_IDENTIFIER as string;

	const res = await atpAgent.com.atproto.repo.listRecords({
		collection: "com.whtwnd.blog.entry",
		repo,
		cursor,
	});

	if (!res.success) return Err(new Error("Failed to get posts"));

	const posts = res.data.records
		.map((data) => {
			const post = whtwndBlogEntryRecordToView({
				uri: data.uri,
				cid: data.cid?.toString() ?? "",
				value: data.value as WhtwndBlogEntryRecord,
			});

			if (isErr(post)) return null;

			return post.value;
		})
		.filter((post) => post !== null);

	return Ok(posts);
};
