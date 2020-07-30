import React from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { Card, CardBody, CardSubtitle, Badge, Row, Col } from "reactstrap";

import slugify from "../util/utilFunc";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/Sidebar";
import authors from "../util/authors";
import SocialLinks from "../components/SocialLinks";

const Singlepost = ({ data, pageContext }) => {
  const post = data.post.frontmatter;
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <Row>
        <Col md="8">
          <Card>
            <Img className="card-image-top" fluid={post.image.img.fluid} />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">
                  {post.date}
                  {"  "}
                </span>
                by {"  "}
                <span className="text-info">{post.author}</span>
              </CardSubtitle>
              <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
              <ul className="post-tags">
                {post.tags.map((tag, index) => (
                  <li key={index}>
                    <Link to={`/tag/${slugify(tag)}`}>
                      <Badge color="primary">{tag}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          <h3 className="text-center">Share this post</h3>
          <SocialLinks post={post} slug={pageContext.slug} id={data.post.id} />
        </Col>
        <Col md="4">
          <Sidebar
            tagPage="true"
            blogAuthor={authors.find((a) => a.name === post.author)}
            authorImg={data.file.img.fluid}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const postQuery = graphql`
  query singlePostQuery($slug: String!, $imageurl: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      ...MyMarkdown
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

export default Singlepost;
