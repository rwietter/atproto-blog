export default function Page() {
	return <div />;
}

// import { Categories } from '@/adapters/ui/modules/categories'
// import type { CategoryPost } from '@/types/Category'
// import matter from 'gray-matter'
// import fs from 'node:fs'
// import path from 'node:path'

// const Page = (props: any) => {
//   const { category } = props.params
//   const { data, error } = getData(category)

//   if (error || !data) {
//     return <h1>Ops! Something went wrong...</h1>
//   }

//   return <Categories posts={data.posts} category={data.category} />
// }

// function getData(category: string) {
//   try {
//     const filePaths = fs.readdirSync(
//       path.join(process.cwd(), 'public', 'posts'),
//     )
//     const mdxFilePaths = filePaths.filter((file) => file.endsWith('.mdx'))

//     const posts = mdxFilePaths.reduce((acc: CategoryPost[], filePath) => {
//       const source = fs.readFileSync(
//         path.join(process.cwd(), 'public', 'posts', filePath),
//         'utf8',
//       )
//       const frontmatter = matter(source)?.data
//       if (frontmatter.category === category) {
//         const data: CategoryPost = {
//           title: frontmatter.title,
//           category: frontmatter.category,
//           publishedAt: frontmatter.publishedAt,
//           updatedAt: frontmatter.updatedAt,
//           slug: filePath.replace(/\.mdx$/, ''),
//         }
//         // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
//         return [...acc, data]
//       }
//       return acc
//     }, [])

//     return {
//       data: {
//         posts,
//         category,
//       },
//     }
//   } catch (error) {
//     console.error(`[CATEGORY]: ${category}`, error)
//     return { data: null, error }
//   }
// }

// export default Page
