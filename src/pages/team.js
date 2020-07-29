import React from "react";

import { Row, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

import Layout from "../components/layout";
import Seo from "../components/seo";
import slugify from "../util/utilFunc";
import authors from "../util/authors";

const Team = () => {
  return (
    <Layout>
      <Seo title="Team" />
      <h2>Team Page</h2>
      {authors.map((author, index) => (
        <Row key={index} className="mb-4">
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

// export const authorQuery = graphql`
//   query($imageurl: String!) {
//     file(relativePath: { eq: $imageurl }) {
//       childImageSharp {
//         fluid {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `;

export default Team;
