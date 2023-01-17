import * as path from 'path';
import type { CreatePagesArgs } from 'gatsby';
import type { MicroCMSBlogs, MicroCMSCategories } from '../../types';

type CreatePagesQueryData = {
  allMicrocmsBlogs: {
    nodes: Pick<MicroCMSBlogs, 'slug'>[];
    categories: {
      fieldValue: string;
      totalCount: number;
    }[];
    months: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
  allMicrocmsCategories: {
    nodes: Pick<MicroCMSCategories, 'name' | 'categoriesId'>[];
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
        categories: group(field: { category: { id: SELECT } }) {
          fieldValue
          totalCount
        }
        months: group(field: { yymm: SELECT }) {
          fieldValue
          totalCount
        }
      }
      allMicrocmsCategories(sort: { sortIndex: ASC }) {
        nodes {
          categoriesId
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }
  if (!result.data) throw new Error('There are no posts');

  const { allMicrocmsBlogs, allMicrocmsCategories } = result.data;

  // create pages for each post
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

  // create pages for postlist page
  const postsPerPage = 1;
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

  // create pages for each category
  allMicrocmsCategories.nodes.forEach(({ categoriesId }) => {
    const group = allMicrocmsBlogs.categories.find(({ fieldValue }) => fieldValue === categoriesId);
    const totalCount = group?.totalCount ?? 0;
    const numPagesForEachCategory = Math.ceil(totalCount / postsPerPage) || 1;
    Array.from({ length: numPagesForEachCategory }).forEach((_, index) => {
      const basePath = `/categories/${categoriesId}/`;
      createPage({
        path: index === 0 ? basePath : `${basePath}${index + 1}`,
        component: path.resolve('./src/templates/categories.tsx'),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPagesForEachCategory,
          currentPage: index + 1,
          fieldValue: categoriesId,
        },
      });
    });
  });

  // create pages for each months
  allMicrocmsBlogs.months.forEach(({ fieldValue, totalCount }) => {
    const numPagesForEachMonth = Math.ceil(totalCount / postsPerPage);
    Array.from({ length: numPagesForEachMonth }).forEach((_, index) => {
      createPage({
        path: index === 0 ? `/${fieldValue}/` : `/${fieldValue}/${index + 1}`,
        component: path.resolve('./src/templates/month.tsx'),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages: numPagesForEachMonth,
          currentPage: index + 1,
          fieldValue,
        },
      });
    });
  });
}
