import React from "react";

import { graphql } from "gatsby";

import { Row, Col } from "reactstrap";

import Sidebar from "../components/Sidebar";
import PostTemp from "../components/PostTemp";
import Layout from "../components/layout";
import authors from "../util/authors";
import SEO from "../components/seo";

const AuthorPage = ({ data, pageContext }) => {
  const { authorName } = pageContext;
  return (
    <Layout>
      <h2>
        Blog{data.authors.totalCount > 1 ? "s" : ""} posted by {authorName}
      </h2>
      <SEO title={authorName + "'s blog"} />
      <Row>
        <Col md="8">
          {data.authors.nodes.map((node) => (
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
          <Sidebar
            tagPage="true"
            blogAuthor={authors.find((a) => a.name === authorName)}
            authorImg={data.file.img.fluid}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const authorQuery = graphql`
  query($authorName: String!, $imageurl: String!) {
    authors: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
    ) {
      ...MyAllMarkdown
    }
    file(relativePath: { eq: $imageurl }) {
      img: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default AuthorPage;
