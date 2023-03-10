import type { CreateSchemaCustomizationArgs } from 'gatsby';
import { convert } from 'html-to-text';
import type { MicrocmsBlogs } from '../../types';

export default async function createSchemaCustomization({ actions, schema }: CreateSchemaCustomizationArgs) {
  const { createTypes } = actions;
  createTypes(`
    type MicrocmsBlogs implements Node {
      year: Int!
      yymm: String!
      slug: String!
      featuredImg: File @link(from: "fields.localFile")
      excerpt: String!
    }
  `);
  createTypes(
    schema.buildObjectType({
      name: `MicrocmsBlogs`,
      fields: {
        year: {
          type: `Int!`,
          resolve: ({ publishedAt }: Pick<MicrocmsBlogs, 'publishedAt'>) => {
            const date = new Date(publishedAt);
            return date.getFullYear();
          },
        },
        yymm: {
          type: `String!`,
          resolve: ({ publishedAt }: Pick<MicrocmsBlogs, 'publishedAt'>) => {
            const date = new Date(publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return `${year}/${month.toString().padStart(2, '0')}`;
          },
        },
        slug: {
          type: `String!`,
          resolve: ({ blogsId, publishedAt }: Pick<MicrocmsBlogs, 'blogsId' | 'publishedAt'>) => {
            const date = new Date(publishedAt);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return `/${encodeURIComponent(year)}/${encodeURIComponent(month.toString().padStart(2, '0'))}/${encodeURIComponent(blogsId)}/`;
          },
        },
        excerpt: {
          type: `String!`,
          args: {
            length: 'Int',
          },
          resolve: ({ content }: Pick<MicrocmsBlogs, 'content'>, { length }: { length: number | undefined }) => {
            const text = convert(content, {
              baseElements: { selectors: ['p'] },
              selectors: [
                { selector: 'img', format: 'skip' },
                { selector: 'a', options: { ignoreHref: true } },
                { selector: 'br', format: 'skip' },
              ],
              wordwrap: false,
            });
            return text.replace(/\n/g, '').slice(0, length ?? 140);
          },
        },
      },
    })
  );
}
