import type { Node } from 'gatsby';
import type { ImageDataLike } from 'gatsby-plugin-image';

export type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
};

/**
 * コンテンツ(API)に自動付与される値
 * https://document.microcms.io/manual/automatic-grant-fields
 */
export type MicrocmsDefaultFields = {
  /** コンテンツの作成日時 */
  createdAt: string;
  /** コンテンツの更新日時 */
  updatedAt: string;
  /** コンテンツの公開日時 */
  publishedAt: string;
  /** コンテンツの改定日時 */
  revisedAt: string;
  /** コンテンツの表示順 (0が最上位) */
  sortIndex: number;
};

export type MicrocmsHello = {
  text: string;
  textarea: string;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
  date: string;
  socials: {
    fieldId: string;
    name: string;
    url: string;
  }[];
} & Omit<MicrocmsDefaultFields, 'sortIndex'> &
  Node;

export type MicrocmsCategories = {
  name: string;
  categoriesId: string;
} & MicrocmsDefaultFields &
  Node;

export type MicrocmsBlogsCategory = Pick<MicrocmsCategories, 'id' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'revisedAt' | 'name'>;

export type MicrocmsBlogsEyecatch = {
  url: string;
  height: number;
  width: number;
};

export type MicrocmsBlogs = {
  blogsId: string;
  title: string;
  content: string;
  eyecatch: MicrocmsBlogsEyecatch | null;
  category: MicrocmsBlogsCategory | null;
} & MicrocmsDefaultFields &
  Node & {
    year: number;
    yymm: string;
    slug: string;
    excerpt: string;
    featuredImg: ImageDataLike | null;
  };

export type MicrocmsBlogsList = Pick<MicrocmsBlogs, 'title' | 'slug' | 'featuredImg' | 'publishedAt' | 'excerpt'> & {
  category: Pick<MicrocmsBlogsCategory, 'name'> | null;
  difference: string;
};
