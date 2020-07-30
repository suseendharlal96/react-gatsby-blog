import React, { useState } from "react";

import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

import {
  Card,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Input,
  CardTitle,
} from "reactstrap";

const Sidebar = ({ blogAuthor, authorImg, tagPage }) => {
  const [email, setemail] = useState("");
  return (
    <div>
      {blogAuthor && (
        <Card>
          <Img className="card-image-top" fluid={authorImg} />
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              {blogAuthor.name}
            </CardTitle>
            <CardText>{blogAuthor.bio}</CardText>
            <div className="author-social-links text-center">
              <ul>
                <li>
                  <a
                    href={blogAuthor.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    <i className="fa fa-facebook-f fa-lg "></i>
                  </a>
                </li>
                <li>
                  <a
                    href={blogAuthor.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    <i className="fa fa-twitter fa-lg "></i>
                  </a>
                </li>
                <li>
                  <a
                    href={blogAuthor.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google"
                  >
                    <i className="fa fa-google fa-lg "></i>
                  </a>
                </li>
                <li>
                  <a
                    href={blogAuthor.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram"
                  >
                    <i className="fa fa-instagram fa-lg "></i>
                  </a>
                </li>
                <li>
                  <a
                    href={blogAuthor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <i className="fa fa-linkedin fa-lg "></i>
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            NewsLetter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input
                type="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Fill in your Email.."
              />
            </FormGroup>
            <button
              className="btn btn-outline-success"
              title={email.length > 0 ? "Subscribe" : "Enter your email"}
              style={
                email.length > 0 ? { cursor: "pointer" } : { cursor: "no-drop" }
              }
              disabled={email.length > 0 ? false : true}
            >
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Advertisement
          </CardTitle>
          <a
            target="_blank"
            href="https://github.com"
            rel="noopener noreferrer"
          >
            <img
              src="https://pngimg.com/uploads/github/github_PNG20.png"
              alt="github"
              style={{ width: "100%" }}
            />
          </a>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Recent Posts
          </CardTitle>
          <StaticQuery
            query={sideBarQuery}
            render={(data) => (
              <div>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Card key={node.id}>
                    <Link
                      to={!tagPage ? node.fields.slug : `/${node.fields.slug}`}
                    >
                      <Img
                        className="card-image-top"
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      ></Img>
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <Link
                          to={
                            !tagPage ? node.fields.slug : `/${node.fields.slug}`
                          }
                        >
                          {node.frontmatter.title}
                        </Link>
                      </CardTitle>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const sideBarQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Sidebar;
