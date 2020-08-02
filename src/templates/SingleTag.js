import React from "react";

import { graphql } from "gatsby";

import { Row, Col } from "reactstrap";

import Layout from "../components/layout";
import PostTemp from "../components/PostTemp";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";

const SingleTag = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.tags;
  const pageHeader = `${totalCount} post${
    +totalCount > 1 ? "s" : ""
  } tagged in ${tag}`;
  return (
    <Layout>
      <h2>{pageHeader}</h2>
      <SEO title={tag} />
      <Row>
        <Col md="8">
          {data.tags.nodes.map((node) => (
            <PostTemp
              tagPage="true"
              key={node.id}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              author={node.frontmatter.author}
              image={node.frontmatter.image.img.fluid}
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

export const tagQuery = graphql`
  query($tag: String!) {
    tags: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      ...MyAllMarkdown
    }
  }
`;

export default SingleTag;
