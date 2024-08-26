import type { ATProtoPort } from "@/ports/output/atprotoPort";

export const getProfile = async (atproto: ATProtoPort) => {
	return atproto.getProfile();
};
