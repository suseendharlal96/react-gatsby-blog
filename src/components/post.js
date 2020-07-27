import React from "react"

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap"

import { Link } from "gatsby"
import Img from "gatsby-image"

const post = props => {
  return (
    <Card>
      <Link to={props.path}>
        <Img className="card-image-top" fluid={props.image} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={props.path}>{props.title}</Link>
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
        <Link to={props.path} className="btn btn-outline-primary float-right">
          Read more
        </Link>
      </CardBody>
    </Card>
  )
}

export default post
