import type { Node } from 'gatsby';

export type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
};

export type MicroCMSHello = {
  text: string;
  updatedAt: string;
  publishedAt: string;
} & Node;

export type MicroCMSBlogsCategory = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  id: string;
  name: string;
};

export type MicroCMSCategories = {
  sortIndex: number;
  categoriesId: string;
} & MicroCMSBlogsCategory &
  Node;

export type MicroCMSBlogsEyecatch = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSBlogs = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: MicroCMSBlogsEyecatch | null;
  category: Omit<MicroCMSBlogsCategory, ''> | null;
  sortIndex: number;
  blogsId: string;
  slug: string;
} & Node;
