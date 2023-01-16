import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Center, Flex, Square } from '@chakra-ui/react';
import useAlpha from '../utils/useAlpha';

type PaginationButtonProps = {
  page: number;
  basePath: string;
  selected?: boolean;
};

function PaginationButton({ page, basePath, selected = false }: PaginationButtonProps) {
  const bg = useAlpha('primary.600', 0.08);
  const selectedBg = useAlpha('primary.600', 0.2);
  return (
    <GatsbyLink to={page === 1 ? `${basePath}` : `${basePath}${page}/`}>
      <Square
        as="button"
        size={10}
        bg={selected ? selectedBg : bg}
        rounded="xl"
        p={4}
        transition="background .25s"
        _hover={{ bg: selectedBg }}
      >
        {page}
      </Square>
    </GatsbyLink>
  );
}

PaginationButton.defaultProps = {
  selected: false,
};

type PaginationProps = {
  numPages: number;
  currentPage: number;
  basePath: string;
};

function Pagination({ numPages, currentPage, basePath }: PaginationProps) {
  const paginations = Array.from(
    new Set([1, ...Array.from({ length: 5 }, (_, i) => Math.max(1, Math.min(currentPage + i - 2, numPages))), numPages])
  );

  return (
    <Center>
      <Flex gap={2}>
        {paginations.map((page) => (
          <PaginationButton key={page.toString()} page={page} selected={page === currentPage} basePath={basePath} />
        ))}
      </Flex>
    </Center>
  );
}

export default Pagination;
