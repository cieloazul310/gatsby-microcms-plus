import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Flex, LinkBox, LinkOverlay, Text, Icon } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Paper from './Paper';

type NavigationButtonProps = React.PropsWithChildren<{
  label: string;
  href: string;
  right?: boolean;
}>;

export function NavigationButton({ children, label, href, right = false }: NavigationButtonProps) {
  return (
    <LinkBox as="button" width={['100%', '100%', '50%']}>
      <Paper hover display="flex" flexDirection={right ? 'row-reverse' : 'row'} alignItems="center" gap={2}>
        <Icon w={8} h={8}>
          {right ? <ArrowForwardIcon /> : <ArrowBackIcon />}
        </Icon>
        <LinkOverlay as={GatsbyLink} to={href}>
          {children || (
            <Text as="h3" fontSize="sm">
              {label}
            </Text>
          )}
        </LinkOverlay>
      </Paper>
    </LinkBox>
  );
}

NavigationButton.defaultProps = {
  right: false,
};

type NavigationProps = {
  left: {
    slug: string;
    label: string;
  } | null;
  right: {
    slug: string;
    label: string;
  } | null;
};

function Navigation({ left, right }: NavigationProps) {
  return (
    <Flex as="nav" gap={2} flexDirection={['column', 'column', left ? 'row' : 'row-reverse']}>
      {left ? <NavigationButton href={left.slug} label={left.label} /> : null}
      {right ? <NavigationButton href={right.slug} label={right.label} right /> : null}
    </Flex>
  );
}

export default Navigation;
