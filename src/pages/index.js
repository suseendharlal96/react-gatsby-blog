import React from "react"

import { graphql, StaticQuery } from "gatsby"

import { Row, Col } from "reactstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>Home Page</h2>
    <Row>
      <Col md="8">
        <StaticQuery
          query={postQuery}
          render={data => {
            return (
              <div>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                  <Post
                    title={node.frontmatter.title}
                    date={node.frontmatter.date}
                    author={node.frontmatter.author}
                    image={node.frontmatter.image.childImageSharp.fluid}
                    path={node.frontmatter.path}
                    body={node.excerpt}
                  />
                ))}
              </div>
            )
          }}
        />
      </Col>
      <Col md="4">
        <div style={{height:'100%',width:"100%",backgroundColor:"grey"}}></div>
      </Col>
    </Row>
  </Layout>
)

const postQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD-MMM-YYYY")
            author
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            path
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
