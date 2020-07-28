import React from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
  Row,
  Col,
} from "reactstrap";

import slugify from "../util/utilFunc";
import Layout from "./layout";
import SEO from "./seo";
import Sidebar from "./Sidebar";

const Singlepost = ({ data }) => {
  const post = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <Row>
        <Col md="8">
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">
                  {post.date}
                  {"  "}
                </span>
                by {"  "}
                <span className="text-info">{post.author}</span>
              </CardSubtitle>
              <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              />
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
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  );
};

export const postQuery = graphql`
  query singlePostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "DD-MMM-YYYY")
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
    }
  }
`;

export default Singlepost;
