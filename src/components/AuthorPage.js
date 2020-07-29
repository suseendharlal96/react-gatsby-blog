import React from "react";

import { graphql } from "gatsby";

import { Row, Col } from "reactstrap";

import Sidebar from "./Sidebar";
import Post from "./Post";
import Layout from "./layout";
import authors from "../util/authors";

const AuthorPage = ({ data, pageContext }) => {
  const { authorName } = pageContext;
  return (
    <Layout>
      <h2>
        Blog{data.allMarkdownRemark.totalCount > 1 ? "s" : ""} posted by {authorName}
      </h2>
      <Row>
        <Col md="8">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Post
              tagPage="true"
              key={node.id}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              author={node.frontmatter.author}
              image={node.frontmatter.image.childImageSharp.fluid}
              slug={node.fields.slug}
              tags={node.frontmatter.tags}
              body={node.excerpt}
            />
          ))}
        </Col>
        <Col md="4">
          <Sidebar
            tagPage="true"
            blogAuthor={authors.find((a) => a.name === authorName)}
            authorImg={data.file.childImageSharp.fluid}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const authorQuery = graphql`
  query($authorName: String!, $imageurl: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            tags
            author
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
    file(relativePath: { eq: $imageurl }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default AuthorPage;
