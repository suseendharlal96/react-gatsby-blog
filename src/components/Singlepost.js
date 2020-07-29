import React from "react";

import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { Card, CardBody, CardSubtitle, Badge, Row, Col } from "reactstrap";
import { DiscussionEmbed } from "disqus-react";

import slugify from "../util/utilFunc";
import Layout from "./layout";
import SEO from "./seo";
import Sidebar from "./Sidebar";
import authors from "../util/authors";

const Singlepost = ({ data, pageContext }) => {
  const baseUrl = "https://suseendharlal.in";
  const post = data.markdownRemark.frontmatter;
  const shortName = "https-suseendharlal-in";
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  };
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
          <h3 className="text-center">Share this post</h3>
          <div className="text-center social-share-links">
            <ul>
              <li>
                <a
                  href={
                    "https://www.facebook.com/sharer/sharer.php?u=" +
                    baseUrl +
                    pageContext.slug
                  }
                  className="facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-facebook-f fa-lg" />
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://twitter.com/share?url=" +
                    baseUrl +
                    pageContext.slug +
                    "&text=" +
                    post.title +
                    "&via" +
                    "twitterHandle"
                  }
                  className="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-twitter fa-lg" />
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://plus.google.com/share?url=" +
                    baseUrl +
                    pageContext.slug
                  }
                  className="google"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-google fa-lg" />
                </a>
              </li>
              <li>
                <a
                  href={
                    "https://www.linkedin.com/shareArticle?url=" +
                    baseUrl +
                    pageContext.slug
                  }
                  className="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-linkedin fa-lg" />
                </a>
              </li>
            </ul>
          </div>
          <DiscussionEmbed shortname={shortName} config={disqusConfig} />
        </Col>
        <Col md="4">
          <Sidebar
            tagPage="true"
            blogAuthor={authors.find((a) => a.name === post.author)}
            authorImg={data.file.childImageSharp.fluid}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export const postQuery = graphql`
  query singlePostQuery($slug: String!, $imageurl: String!) {
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
    file(relativePath: { eq: $imageurl }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Singlepost;
