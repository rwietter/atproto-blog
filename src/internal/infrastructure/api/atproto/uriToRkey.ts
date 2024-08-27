import { Err, Ok, type Result } from "@/common/fp/Result";

export const uriToRkey = (uri: string): Result<string> => {
	const rkey = uri.split("/").pop();
	if (!rkey) return Err(new Error("Failed to convert uri to rkey"));
	return Ok(rkey);
};
