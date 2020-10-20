import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import { Row, Col } from "reactstrap";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostTemp from "../components/PostTemp";
import Sidebar from "../components/Sidebar";
import PaginationPage from "../components/PaginationPage";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
      ) {
        ...MyAllMarkdown
      }
    }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <h2>Home Page</h2>
      <PaginationPage
        currentPage={1}
        totalPages={Math.ceil(data.posts.totalCount / 2)}
      />
      <Row>
        <Col md="8">
          {/* <StaticQuery
          query={indexQuery}
          render={(data) => {
            return ( */}
          <div>
            {data.posts.nodes.map((node) => (
              <PostTemp
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
          </div>
          {/* );
          }}
        /> */}
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  );
};

export default IndexPage;
