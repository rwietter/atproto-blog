import {
	type WhtwndBlogFrontmatter,
	getPost,
	getPosts,
	getProfile,
} from "@/adapters/atproto";
import { makeSeo } from "@/adapters/ui/components/SEO/makeSeo";
import ArticleContent from "@/adapters/ui/modules/article/content";
import ArticleHeader from "@/adapters/ui/modules/article/header";
import { Failure, Success, isFailure } from "@/core/common/fp/Result";
import styles from "@/domains/article/styles.module.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getReadingTime } from "utils/getTimeReading";
import { getMdxSource } from "utils/mdx/serializeMdx";

const ArticleFooter = dynamic(
	() => import("@/adapters/ui/modules/article/footer"),
);

type PagePropTypes = {
	params: { slug?: string };
	searchParams: { rkey?: string };
};

const Page = async (props: PagePropTypes) => {
	const { slug } = props.params;
	const searchParams = props.searchParams;

	if (!searchParams.rkey) return notFound();

	const data = await getData(searchParams.rkey);

	if (isFailure(data)) return <p>Page not found</p>;

	const { mdxSource, readingTime, post, profile } = data.value;

	const frontmatter: WhtwndBlogFrontmatter = {
		author: profile.displayName,
		title: post.title,
		date: post.createdAt,
		publishedAt: post.createdAt,
		description: post.content?.slice(0, 300) || "",
		category: "",
	};

	const shortedContent = post.content?.slice(0, 300);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id:": "https://rwietter.dev",
		},
		headline: post.title,
		author: "Maurício Witter",
		articleBody: post?.content,
		backstory: shortedContent,
		license: "CC-BY-SA-4.0",
		url: `https://rwietter.dev/blog/article/${slug}`,
		text: shortedContent,
		keywords: "article, blog, rwietter, web development, programming, tech",
		image: "",
		datePublished: post.createdAt,
		dateModified: post.createdAt,
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<section className={styles.articleMarkdownContainer}>
				<ArticleHeader readingTime={readingTime} frontmatter={frontmatter} />
				<ArticleContent mdxSource={mdxSource} />
			</section>
			<ArticleFooter post={frontmatter} />
		</>
	);
};

export default Page;

export async function generateStaticParams() {
	const data = await generatePaths();

	if (isFailure(data)) return [];

	return data.value.posts;
}

const generatePaths = async () => {
	try {
		const posts = await getPosts(undefined);
		const postsSlug = posts.map((post) => ({
			slug: post.rkey,
		}));

		return Success({ posts: postsSlug });
	} catch (error) {
		console.error(error);
		return Failure(new Error("Failed to fetch post"));
	}
};

async function getData(slug: string) {
	try {
		const [post, profile] = await Promise.all([getPost(slug), getProfile()]);

		const { readTime } = getReadingTime(post.content);
		const mdxSource = await getMdxSource(post.content);

		if (!mdxSource)
			return Failure(new Error("Is not possible parse post content"));

		return Success({
			post: post,
			profile: profile,
			mdxSource,
			readingTime: readTime,
		});
	} catch (error) {
		console.error(error);
		return Failure(new Error("Failed to get Post"));
	}
}

export async function generateMetadata({
	searchParams,
}: PagePropTypes): Promise<Metadata> {
	const rkey = searchParams.rkey;

	if (!rkey) return {};

	const data = await getData(rkey);

	if (isFailure(data)) {
		return {};
	}

	const post = data.value.post;
	const profile = data.value.profile;

	const shortedContent = post.content?.slice(0, 300) || "";

	const seo = makeSeo({
		title: post.title.trim(),
		description: shortedContent,
		image: "",
		ogText: shortedContent,
		keywords: "article, blog, rwietter, web development, programming, tech",
		author: profile.displayName,
		slug: `/blog/article/${post.title}?rkey=${rkey}`,
		abstract: shortedContent,
	});

	return seo;
}
