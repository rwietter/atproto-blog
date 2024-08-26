import type { CategoryPost } from "@/types/Category";
import type { FC } from "react";
import { Category } from "../category";
import styles from "./styles.module.css";

type BlogPropTypes = {
	posts: CategoryPost[];
	category: string;
};

const Categories: FC<BlogPropTypes> = ({ posts, category }) => (
	<article className={styles.articlesContainer}>
		<h1>
			Articles in <strong>#{category}</strong>
		</h1>
		<ul>
			{posts?.map((post: CategoryPost) => (
				<Category categoryPost={post} key={post.slug} />
			))}
		</ul>
	</article>
);

export { Categories };
