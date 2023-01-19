/* eslint react/jsx-props-no-spreading: warn */
import * as React from 'react';
import parser, { attributesToProps, domToReact, Element, type HTMLReactParserOptions } from 'html-react-parser';
import chakraComponents from '../components/chakraComponents';

const createOptions = (ignores?: string[]): HTMLReactParserOptions => ({
  replace: (domNode) => {
    if (!(domNode instanceof Element) || domNode.type !== 'tag') return false;
    const { attribs, children, name } = domNode;
    const props = attributesToProps(attribs);
    const ignoreTags = ignores ?? [];

    if (name === 'h1') return <chakraComponents.h1 {...props}>{domToReact(children, createOptions())}</chakraComponents.h1>;

    if (name === 'h2') return <chakraComponents.h2 {...props}>{domToReact(children, createOptions())}</chakraComponents.h2>;

    if (name === 'h3') return <chakraComponents.h3 {...props}>{domToReact(children, createOptions())}</chakraComponents.h3>;

    if (name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(children, createOptions())}</chakraComponents.h4>;

    if (name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(children, createOptions())}</chakraComponents.h4>;

    if (name === 'h5') return <chakraComponents.h5 {...props}>{domToReact(children, createOptions())}</chakraComponents.h5>;

    if (name === 'p') return <chakraComponents.p {...props}>{domToReact(children, createOptions())}</chakraComponents.p>;

    if (name === 'ul') return <chakraComponents.ul {...props}>{domToReact(children, createOptions())}</chakraComponents.ul>;

    if (name === 'li') return <chakraComponents.li {...props}>{domToReact(children, createOptions())}</chakraComponents.li>;

    if (name === 'a' && !ignoreTags.includes('a'))
      return <chakraComponents.a {...props}>{domToReact(children, createOptions())}</chakraComponents.a>;

    if (name === 'blockquote')
      return <chakraComponents.blockquote {...props}>{domToReact(children, createOptions())}</chakraComponents.blockquote>;

    if (name === 'img') return <chakraComponents.img {...props} />;

    if (name === 'iframe') return <chakraComponents.iframe {...props}>{domToReact(children, createOptions())}</chakraComponents.iframe>;

    if (name === 'code' && !ignoreTags.includes('code'))
      return <chakraComponents.code {...props}>{domToReact(domNode.children, createOptions())}</chakraComponents.code>;

    if (name === 'pre') return <chakraComponents.pre {...props}>{domToReact(children, createOptions(['code']))}</chakraComponents.pre>;
    return null;
  },
});
const options = createOptions();
/*
const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element) || domNode.type !== 'tag') return false;
    const { attribs, children, name } = domNode;
    const props = attributesToProps(attribs);

    if (name === 'h1') return <chakraComponents.h1 {...props}>{domToReact(children, options)}</chakraComponents.h1>;

    if (name === 'h2') return <chakraComponents.h2 {...props}>{domToReact(children, options)}</chakraComponents.h2>;

    if (name === 'h3') return <chakraComponents.h3 {...props}>{domToReact(children, options)}</chakraComponents.h3>;

    if (name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(children, options)}</chakraComponents.h4>;

    if (name === 'h4') return <chakraComponents.h4 {...props}>{domToReact(children, options)}</chakraComponents.h4>;

    if (name === 'h5') return <chakraComponents.h5 {...props}>{domToReact(children, options)}</chakraComponents.h5>;

    if (name === 'p') return <chakraComponents.p {...props}>{domToReact(children, options)}</chakraComponents.p>;

    if (name === 'ul') return <chakraComponents.ul {...props}>{domToReact(children, options)}</chakraComponents.ul>;

    if (name === 'li') return <chakraComponents.li {...props}>{domToReact(children, options)}</chakraComponents.li>;

    if (name === 'a') return <chakraComponents.a {...props}>{domToReact(children, options)}</chakraComponents.a>;

    if (name === 'blockquote')
      return <chakraComponents.blockquote {...props}>{domToReact(children, options)}</chakraComponents.blockquote>;

    if (name === 'img') return <chakraComponents.img {...props} />;

    if (name === 'iframe') return <chakraComponents.iframe {...props}>{domToReact(children, options)}</chakraComponents.iframe>;

    if (name === 'code') return <chakraComponents.code {...props}>{domToReact(domNode.children, options)}</chakraComponents.code>;

    if (name === 'pre') return <chakraComponents.pre {...props}>{domToReact(children, options)}</chakraComponents.pre>;
    return null;
  },
};
*/

function useArticle(content: string) {
  return React.useMemo(() => parser(content, options), [content]);
}

export default useArticle;
