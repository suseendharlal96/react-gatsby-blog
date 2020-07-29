import React from "react";

import { graphql } from "gatsby";

import { Row, Col } from "reactstrap";

import Layout from "./layout";
import Post from "./Post";
import Sidebar from "./Sidebar";

const SingleTag = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const pageHeader = `${totalCount} post${
    +totalCount > 1 ? "s" : ""
  } tagged in ${tag}`;
  return (
    <Layout>
      <h2>{pageHeader}</h2>
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
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  );
};

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tags
            date(formatString: "DD-MMM-YYYY")
            author
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 150) {
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

export default SingleTag;
