import React from "react";

import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

import { Row, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import Layout from "../components/layout";
import Seo from "../components/seo";
import slugify from "../util/utilFunc";
import authors from "../util/authors";

const Team = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "images" } }) {
          edges {
            node {
              relativePath
              img: childImageSharp {
                fixed(height: 200, fit: CONTAIN) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `
  );

  const getImage = (author) => {
    let image;
    image = data.allFile.edges.find(
      (edge) => edge.node.relativePath === author.imageurl
    );
    if (image) {
      return image.node.img.fixed;
    }
  };

  return (
    <Layout>
      <Seo title="Team" />
      <h2>Our Team</h2>
      {authors.map((author, index) => (
        <Row key={index} className="mb-4">
          <div className="col-md-4">{<Img fixed={getImage(author)} />}</div>
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

export default Team;
