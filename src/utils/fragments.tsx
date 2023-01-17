import { graphql, useStaticQuery } from 'gatsby';

export default function useFragments() {
  useStaticQuery(graphql`
    fragment MicrocmsBlogsList on MicrocmsBlogs {
      slug
      title
      publishedAt(formatString: "YYYY年MM月DD日")
      featuredImg {
        childImageSharp {
          gatsbyImageData(width: 320)
        }
      }
    }
  `);
}
