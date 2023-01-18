import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { chakra, Box, AspectRatio, LinkBox, LinkOverlay, Text, Heading } from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useAlpha from '../utils/useAlpha';
import type { MicroCMSBlogsList } from '../../types';

const Image = chakra('image');

type ArticleItemProps = MicroCMSBlogsList;

function ArticleItem({ slug, title, publishedAt, featuredImg, excerpt }: ArticleItemProps) {
  const bg = useAlpha('primary.600', 0.08);
  const image = getImage(featuredImg);
  return (
    <LinkBox as="article" rounded="xl" borderWidth="1px" transition="background .25s" _hover={{ bg }} display="flex">
      <Box flexShrink="0" display="flex">
        <AspectRatio bg={bg} ratio={[1, 16 / 9]} width={['100px', '180px', '240px']} rounded="xl">
          {image ? <Image as={GatsbyImage} image={image} alt={title} objectFit="fill" rounded="xl" /> : <Text>Image</Text>}
        </AspectRatio>
      </Box>
      <Box p={[2, 4]}>
        <Text as="time" fontSize="sm" mb={2}>
          {publishedAt}
        </Text>
        <LinkOverlay as={GatsbyLink} to={slug}>
          <Heading as="h3" fontSize={['sm', 'md']} fontWeight={['normal', 'semibold', 'bold']} mb={2}>
            {title}
          </Heading>
        </LinkOverlay>
        <Text wordBreak="break-word" textOverflow="ellipsis" display={['none', 'none', 'block']}>
          {excerpt}
        </Text>
      </Box>
    </LinkBox>
  );
}

export default ArticleItem;
