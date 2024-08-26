/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import { AtpAgent, BskyAgent } from "@atproto/api";

const ATP_SERVICE = process.env.ATP_SERVICE as string;
export const atpAgent = new AtpAgent({
	service: ATP_SERVICE,
});
export const bskyAgent = new BskyAgent({
	service: "https://public.api.bsky.app/",
});
