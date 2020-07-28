import React, { useState } from "react";

import { graphql, StaticQuery, Link } from "gatsby";
import Img from "gatsby-image";

import { Card, CardBody, Form, FormGroup, Input, CardTitle } from "reactstrap";

const Sidebar = () => {
  const [email, setemail] = useState("");
  return (
    <div>
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
          <img
            src="https://via.placeholder.com/320x300"
            alt="nice"
            style={{ width: "100%" }}
          />
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
                    <Link to={node.fields.slug}>
                      <Img
                        className="card-image-top"
                        fluid={node.frontmatter.image.childImageSharp.fluid}
                      ></Img>
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <Link to={node.fields.slug}>
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
