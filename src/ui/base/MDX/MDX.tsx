"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import Err from "@/ui/base/Callouts/ErrorCallout";
import Info from "@/ui/base/Callouts/InfoCallout";
import Message from "@/ui/base/Callouts/MessagerCallout";
import Success from "@/ui/base/Callouts/SuccessCallout";
import Warn from "@/ui/base/Callouts/WarningCallout";
import Chunk from "@/ui/base/Chunk/Chunk";
import Micro from "@/ui/base/MicroPost/MicroPost";
import High from "@/ui/base/TextHighlight/TextHighlight";

interface ArticleData {
	mdxSource: MDXRemoteSerializeResult;
}

const components = {
	High,
	Success,
	Warn,
	Err,
	Info,
	Message,
	Chunk,
	Micro,
};

const MDX: React.FC<ArticleData> = ({ mdxSource }) => {
	return <MDXRemote {...mdxSource} components={components} />;
};

export { MDX };
