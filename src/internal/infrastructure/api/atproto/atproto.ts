/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import type { AppBskyActorDefs } from "@atproto/api";

export interface WhtwndBlogEntryRecord {
	$type: "com.whtwnd.blog.entry";
	content?: string;
	createdAt: string;
	theme?: string;
	title: string;
	ogp?: {
		height: number | null;
		url: string | null;
		width: number | null;
	};
}

export interface WhtwndBlogEntryView {
	rkey: string;
	cid: string;
	title: string;
	content?: string;
	createdAt: string;
	banner?: string;
}

export interface BskyProfileView extends AppBskyActorDefs.ProfileViewDetailed {}

export interface WhtwndBlogFields {
	posts: WhtwndBlogEntryView[];
	profile: AppBskyActorDefs.ProfileViewDetailed;
}
