import { graphql } from "gatsby";

export const myAllMarkdown = graphql`
  fragment MyAllMarkdown on MarkdownRemarkConnection {
    totalCount
    nodes {
      ...MyMarkdown
      fields {
        slug
      }
      excerpt
    }
  }
`;

// You can get edges if u want to

// export const myAllMarkdown = graphql`
//   fragment MyAllMarkdown on MarkdownRemarkConnection {
//     totalCount
//     edges {
//       node {
//         ...MyMarkdown
//         fields {
//           slug
//         }
//         excerpt
//       }
//     }
//   }
// `;
