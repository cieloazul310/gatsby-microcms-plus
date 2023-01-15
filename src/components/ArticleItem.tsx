import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Box, AspectRatio, LinkBox, LinkOverlay, Text, Heading } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';
import type { MicroCMSBlogs } from '../../types';

type ArticleItemProps = Pick<MicroCMSBlogs, 'slug' | 'title' | 'publishedAt'>;

function ArticleItem({ slug, title, publishedAt }: ArticleItemProps) {
  const bg = useAlpha('primary.600', 0.08);
  return (
    <LinkBox as="article" rounded="xl" borderWidth="1px" transition="background .25s" _hover={{ bg }} display="flex">
      <Box flexShrink="0" display="flex">
        <AspectRatio bg={bg} ratio={[1, 1, 16 / 9]} width={['80px', '120px', '160px', '240px']}>
          <Text>hoge</Text>
        </AspectRatio>
      </Box>
      <Box p={[2, 4]}>
        <Text as="time" fontSize="sm" mb={2}>
          {publishedAt}
        </Text>
        <LinkOverlay as={GatsbyLink} to={slug}>
          <Heading as="h3" size="sm" fontWeight="normal">
            {title}
          </Heading>
        </LinkOverlay>
      </Box>
    </LinkBox>
  );
}

export default ArticleItem;
