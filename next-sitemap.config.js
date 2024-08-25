const SITE_URL = `${process.env.SITE_URL}/` || "https://rwietter.dev/";

/** @type {import('next-sitemap').IConfig} */
const options = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	changefreq: "daily",
	autoLastmod: true,
	generateIndexSitemap: true,
	priority: 1,
	exclude: ["/admin/**"],
	robotsTxtOptions: {
		additionalSitemaps: [`${SITE_URL}sitemap-0.xml`],
		policies: [
			{ userAgent: "*", allow: "/*" },
			{ userAgent: "Twitterbot", allow: "/*" },
			{ userAgent: "Googlebot", allow: "/*" },
			{ userAgent: "Bingbot", allow: "/*" },
			{ userAgent: "Slurp", allow: "/*" },
			{ userAgent: "DuckDuckBot", allow: "/*" },
		],
	},
};

export default options;
