import React from "react";

import { graphql } from "gatsby";
import Img from "gatsby-image";

import { Row, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import Layout from "./layout";
import Seo from "./seo";
import slugify from "../util/utilFunc";
import authors from "../util/authors";

const Team = ({ data }) => {
  return (
    <Layout>
      <Seo title="Team" />
      <h2>Our Team</h2>
      {authors.map((author, index) => (
        <Row key={index} className="mb-4">
          <div className="col-md-4">
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
          <div className="col-md-8">
            <Card>
              <CardBody>
                <CardTitle>{author.name}</CardTitle>
                <CardText>{author.bio}</CardText>
                <Button
                  color="primary"
                  href={`/author/${slugify(author.name)}`}
                >
                  View my blogs
                </Button>
              </CardBody>
            </Card>
          </div>
        </Row>
      ))}
      ;
    </Layout>
  );
};

export const authorQuery = graphql`
  query($imageurl: String!) {
    file(relativePath: { eq: $imageurl }) {
      childImageSharp {
        fluid(maxHeight: 15) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Team;
