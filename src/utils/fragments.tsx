import { graphql, useStaticQuery } from 'gatsby';

export default function useFragments() {
  useStaticQuery(graphql`
    fragment MicrocmsBlogsList on MicrocmsBlogs {
      slug
      title
      excerpt(length: 180)
      publishedAt(formatString: "YYYY年MM月DD日")
      publishDate: publishedAt(formatString: "YYYY-MM-DD")
      category {
        name
      }
      featuredImg {
        childImageSharp {
          gatsbyImageData(width: 320)
        }
      }
    }
  `);
}
