import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { LinkBox, LinkOverlay, Box, Heading } from '@chakra-ui/react';
import type { MicroCMSBlogs } from '../../types';

type ArticleItemProps = Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>;

function ArticleItem({ slug, title, publishedAt }: ArticleItemProps) {
  return (
    <LinkBox as="article" p={2} rounded="xl" borderWidth="1px">
      <Box as="time">{publishedAt}</Box>
      <LinkOverlay as={GatsbyLink} to={slug}>
        <Heading size="sm" my={2}>
          {title}
        </Heading>
      </LinkOverlay>
    </LinkBox>
  );
}

export default ArticleItem;
