/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import parser, { attributesToProps, domToReact, Element, type HTMLReactParserOptions } from 'html-react-parser';
import chakraComponents from '../components/chakraComponents';

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element) || domNode.type !== 'tag') return false;
    const props = attributesToProps(domNode.attribs);

    if (domNode.name === 'h1') return <chakraComponents.h1 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h1>;
    if (domNode.name === 'h2') return <chakraComponents.h2 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h2>;
    if (domNode.name === 'h3') return <chakraComponents.h3 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h3>;
    if (domNode.name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h4>;
    if (domNode.name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h4>;
    if (domNode.name === 'h5') return <chakraComponents.h5 {...props}>{domToReact(domNode.children, options)}</chakraComponents.h5>;
    if (domNode.name === 'p') return <chakraComponents.p {...props}>{domToReact(domNode.children, options)}</chakraComponents.p>;
    if (domNode.name === 'ul') return <chakraComponents.ul {...props}>{domToReact(domNode.children, options)}</chakraComponents.ul>;
    if (domNode.name === 'li') return <chakraComponents.li {...props}>{domToReact(domNode.children, options)}</chakraComponents.li>;
    return null;
  },
};

function useArticle(content: string) {
  return React.useMemo(() => parser(content, options), [content]);
}

export default useArticle;
