import type { Node } from 'gatsby';

export type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
};

export type MicroCMSHello = {
  text: string;
} & Node;

export type MicroCMSBlogsCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

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
  category: MicroCMSBlogsCategory | null;
  sortIndex: number;
  blogsId: string;
  slug: string;
} & Node;
