import React from "react";

import { Badge, Button } from "reactstrap";

import Layout from "./layout";
import Seo from "./seo";
import slugify from "../util/utilFunc";

const Tags = ({ pageContext }) => {
  const { tags, tagCount } = pageContext;
  return (
    <Layout>
      <Seo title="All Tags" keywords={["tags,topics"]} />
      <h2>All Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag}
              <Badge color="light">{tagCount[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Tags;
