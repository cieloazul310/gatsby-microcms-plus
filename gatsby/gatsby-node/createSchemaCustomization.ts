import type { CreateSchemaCustomizationArgs } from 'gatsby';
import type { MicroCMSBlogs } from '../../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;
  createTypes(`
    type MicrocmsBlogs implements Node {
      slug: String!
    }
  `);
  createTypes(
    schema.buildObjectType({
      name: `MicrocmsBlogs`,
      fields: {
        slug: {
          type: `String!`,
          resolve: ({ blogsId, publishedAt }: Pick<MicroCMSBlogs, 'blogsId' | 'publishedAt'>) => {
            const date = new Date(publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return `/${year}/${month.toString().padStart(2, '0')}/${blogsId}/`;
          },
        },
      },
    })
  );
}
