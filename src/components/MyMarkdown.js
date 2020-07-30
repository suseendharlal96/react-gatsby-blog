import { graphql } from "gatsby";

export const myMarkdownRemark = graphql`
  fragment MyMarkdown on MarkdownRemark {
    id
    html
    frontmatter {
      title
      date(formatString: "DD-MMM-YYYY")
      tags
      author
      image {
        img: childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
