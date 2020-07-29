import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import { Row, Col } from "reactstrap";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import PaginationPage from "../components/PaginationPage";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
      ) {
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
                childImageSharp {
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
    }
  `);
  return (
    <Layout>
      <SEO title="Home" />
      <h2>Home Page</h2>
      <PaginationPage
        currentPage={1}
        totalPages={Math.ceil(data.allMarkdownRemark.totalCount / 2)}
      />
      <Row>
        <Col md="8">
          {/* <StaticQuery
          query={indexQuery}
          render={(data) => {
            return ( */}
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
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
