import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { chakra, Box, AspectRatio, LinkBox, LinkOverlay, Text, Heading, Badge, useColorMode } from '@chakra-ui/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useAlpha from '../utils/useAlpha';
import type { MicrocmsBlogsList } from '../../types';

const Image = chakra('image');

type ArticleItemProps = MicrocmsBlogsList;

function ArticleItem({ slug, title, publishedAt, publishDate, category, featuredImg, excerpt }: ArticleItemProps) {
  const daysBefore = React.useMemo(() => {
    const diff = Date.now() - new Date(publishDate).valueOf();
    return Math.ceil(diff / 1000 / 60 / 60 / 24);
  }, [publishDate]);
  const bg = useAlpha('primary.600', 0.08);
  const image = getImage(featuredImg);
  const { colorMode } = useColorMode();

  return (
    <LinkBox as="article" rounded="xl" borderWidth="1px" transition="background .25s" _hover={{ bg }} display="flex">
      <Box flexShrink="0" display="flex">
        {category ? (
          <Badge variant="solid" position="absolute" zIndex="calc(var(--chakra-zIndices-docked) + 1)" top={1} left={1}>
            {category.name}
          </Badge>
        ) : null}
        <AspectRatio bg={bg} ratio={[1, 16 / 9]} width={['120px', '180px', '240px']} rounded="xl">
          {image ? (
            <Image as={GatsbyImage} image={image} alt={title} objectFit="fill" rounded="xl" zIndex="docked" />
          ) : (
            <Text color={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.500'} fontSize={['md', 'md', 'lg']} fontWeight="extrabold">
              {category?.name ?? '記事'}
            </Text>
          )}
        </AspectRatio>
      </Box>
      <Box p={[2, 4]} flexGrow={1} display="flex" flexDirection="column" justifyContent="flex-start">
        <Text fontSize="sm" mb={2} display="flex" alignItems="center" gap={1}>
          <Text as="time" dateTime={publishDate}>
            {publishedAt}
          </Text>
          {typeof window === 'object' && daysBefore >= 0 && daysBefore < 8 ? <Badge colorScheme="secondary">New</Badge> : null}
        </Text>
        <LinkOverlay as={GatsbyLink} to={slug} zIndex="calc(var(--chakra-zIndices-docked) + 2)">
          <Heading as="h3" fontSize={['sm', 'md']} fontWeight={['normal', 'semibold', 'bold']} mb={2}>
            {title}
          </Heading>
        </LinkOverlay>
        <Box display={['none', 'none', 'block']}>
          <Text noOfLines={[0, 0, 2]}>{excerpt}</Text>
        </Box>
      </Box>
    </LinkBox>
  );
}

export default ArticleItem;
