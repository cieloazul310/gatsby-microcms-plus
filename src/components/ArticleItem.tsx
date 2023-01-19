import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { chakra, Box, AspectRatio, LinkBox, LinkOverlay, Text, Heading, Badge, useColorMode } from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useAlpha from '../utils/useAlpha';
import type { MicrocmsBlogsList } from '../../types';

const Image = chakra('image');

type ArticleItemProps = MicrocmsBlogsList;

function ArticleItem({ slug, title, publishedAt, category, difference, featuredImg, excerpt }: ArticleItemProps) {
  const daysBefore = parseInt(difference, 10);
  const bg = useAlpha('primary.600', 0.08);
  const image = getImage(featuredImg);
  const { colorMode } = useColorMode();

  return (
    <LinkBox as="article" rounded="xl" borderWidth="1px" transition="background .25s" _hover={{ bg }} display="flex">
      <Box flexShrink="0" display="flex">
        {category ? (
          <Badge variant="solid" position="absolute" zIndex={11} top={1} left={1}>
            {category.name}
          </Badge>
        ) : null}
        <AspectRatio bg={bg} ratio={[1, 16 / 9]} width={['120px', '180px', '240px']} rounded="xl">
          {image ? (
            <Image as={GatsbyImage} image={image} alt={title} objectFit="fill" rounded="xl" zIndex="docked" />
          ) : (
            <Text color={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.500'} fontSize={['md', 'md', 'lg']} fontWeight="extrabold">
              {category?.name}
            </Text>
          )}
        </AspectRatio>
      </Box>
      <Box p={[2, 4]}>
        <Text fontSize="sm" mb={2} display="flex" alignItems="center" gap={1}>
          <Text as="time">{publishedAt}</Text>
          {daysBefore < 8 ? <Badge colorScheme="secondary">New</Badge> : null}
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
