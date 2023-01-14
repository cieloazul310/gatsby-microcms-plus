import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { MicroCMSBlogs } from '../../types';

type CreatePagesQueryData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug'>[];
  };
};

export default async function createPages({ graphql, actions, reporter }: CreatePagesArgs) {
  const { createPage } = actions;
  const result = await graphql<CreatePagesQueryData>(`
    query {
      allMicrocmsBlogs(sort: { publishedAt: DESC }) {
        nodes {
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allMicrocmsBlogs } = result.data;

  // create page for each post
  allMicrocmsBlogs.nodes.forEach(({ slug }, index) => {
    const newer = index !== 0 ? allMicrocmsBlogs.nodes[index - 1].slug : null;
    const older = index !== allMicrocmsBlogs.nodes.length - 1 ? allMicrocmsBlogs.nodes[index + 1].slug : null;

    createPage({
      path: slug,
      component: path.resolve('./src/templates/blog-post.tsx'),
      context: {
        slug,
        newer,
        older,
      },
    });
  });

  // create page for postlist page
  const postsPerPage = 20;
  const numPages = Math.ceil(allMicrocmsBlogs.nodes.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/posts/' : `/posts/${index + 1}/`,
      component: path.resolve('./src/templates/post-list.tsx'),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    });
  });
}
