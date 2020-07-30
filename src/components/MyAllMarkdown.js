import { graphql } from "gatsby";

export const myAllMarkdown = graphql`
  fragment MyAllMarkdown on MarkdownRemarkConnection {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD-MMM-YYYY")
          author
          tags
          image {
            img: childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
