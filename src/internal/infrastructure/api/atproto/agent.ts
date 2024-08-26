/**
 * Credits @haileyok <https://github.com/haileyok>
 * Based on <https://github.com/haileyok/blug>
 */

import { AtpAgent } from "@atproto/api";

const ATP_SERVICE = process.env.ATP_SERVICE as string;

export const atpAgent = new AtpAgent({
	service: ATP_SERVICE,
});

export const atProtoAuthenticate = async () => {
	await atpAgent.login({
		identifier: process.env.ATP_IDENTIFIER ?? "",
		password: process.env.ATP_PASSWORD ?? "",
	});
};
