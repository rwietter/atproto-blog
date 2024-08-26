import Link from "next/link";
import { AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai";
import { RiTimer2Line } from "react-icons/ri";

import { getDate } from "@/utils/get-date";
import styles from "./styles.module.css";

export interface BlogPostFrontmatter {
	readonly author: string | undefined;
	readonly title: string;
	readonly date: string;
	readonly createdAt: string;
}

interface ArticleHeaderPropTypes {
	readonly frontmatter: BlogPostFrontmatter;
	readonly readingTime: string;
}

const ArticleHeader: React.FC<Partial<ArticleHeaderPropTypes>> = (props) => {
	const createdAt = getDate(props?.frontmatter?.createdAt);

	return (
		<section className={styles.section}>
			<div>
				<div className={styles.infoHeader}>
					<Link href="/blog">
						<button
							className={styles.backToOverview}
							type="button"
							aria-label="Back to overview"
						>
							<AiOutlineArrowLeft size={19} aria-hidden="true" />
							<p>Back to overview</p>
						</button>
					</Link>
					<p className={styles.dateTimeRead}>
						<AiOutlineCalendar size={17} />
						{createdAt}
						&nbsp;|&nbsp;
						<RiTimer2Line size={17} />
						{props.readingTime}
					</p>
				</div>
			</div>

			<h1 className={styles.articleTitle}>{props.frontmatter?.title}</h1>
		</section>
	);
};

export default ArticleHeader;
