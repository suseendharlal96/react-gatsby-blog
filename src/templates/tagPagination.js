import React from "react";

import { graphql } from "gatsby";
import { Row, Col } from "reactstrap";

import Layout from "../components/layout";
import PostTemp from "../components/PostTemp";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";
import PaginationPage from "../components/PaginationPage";

const tagPagination = ({ data, pageContext }) => {
  const { tag, totalPages, currentPage, tagCount } = pageContext;
  const pageHeader = `${tagCount} post${
    +tagCount > 1 ? "s" : ""
  } tagged in ${tag}`;
  return (
    <Layout>
      <h2>{pageHeader}</h2>
      {tagCount > 2 && (
        <PaginationPage
          currentPage={currentPage}
          totalPages={totalPages}
          tag={tag}
        />
      )}
      <SEO title={tag} />
      <Row>
        <Col md="8">
          {data.allMarkdownRemark.nodes.map((node) => (
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

export const tagPaginationQuery = graphql`
  query($tag: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      skip: $skip
      limit: $limit
    ) {
      ...MyAllMarkdown
    }
  }
`;

export default tagPagination;
