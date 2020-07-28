import React from "react";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
} from "reactstrap";

import { Link } from "gatsby";
import Img from "gatsby-image";

import slugify from "../util/utilFunc";

const post = (props) => {
  return (
    <Card>
      <Link to={props.slug}>
        <Img className="card-image-top" fluid={props.image} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={props.slug}>{props.title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">
            {props.date}
            {"  "}
          </span>
          by {"  "}
          <span className="text-info">{props.author}</span>
        </CardSubtitle>
        <CardText>{props.body}</CardText>
        <ul className="post-tags">
          {props.tags.map((tag, index) => (
            <li key={index}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge color="primary">{tag}</Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={props.slug} className="btn btn-outline-primary float-right">
          Read more
        </Link>
      </CardBody>
    </Card>
  );
};

export default post;
