import React from "react";

import { graphql } from "gatsby";

import { Row, Col } from "reactstrap";

import Layout from "../components/layout";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";
import PaginationPage from "../components/PaginationPage";

const PostPage = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage } = pageContext;
  const { totalPages } = pageContext;
  return (
    <Layout>
      <SEO title={`Page${currentPage}`} />
      <PaginationPage currentPage={currentPage} totalPages={totalPages} />
      <Row>
        <Col md="8">
          {posts.map(({ node }) => (
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
          <Sidebar tagPage="true" />
        </Col>
      </Row>
    </Layout>
  );
};

export const postPageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            author
            tags
            date(formatString: "DD-MMM-YYYY")
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
  }
`;

export default PostPage;
