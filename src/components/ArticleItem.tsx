import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { LinkBox, LinkOverlay, Text, Heading } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';
import type { MicroCMSBlogs } from '../../types';

type ArticleItemProps = Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>;

function ArticleItem({ slug, title, publishedAt }: ArticleItemProps) {
  const bg = useAlpha('primary.600', 0.1);
  return (
    <LinkBox as="article" p={[4, 8]} rounded="xl" borderWidth="1px" transition="background .25s" _hover={{ bg }}>
      <Text as="time">{publishedAt}</Text>
      <LinkOverlay as={GatsbyLink} to={slug}>
        <Heading as="h3" size="sm" my={2}>
          {title}
        </Heading>
      </LinkOverlay>
    </LinkBox>
  );
}

export default ArticleItem;
