const path = require("path");

const slugify = require("./src/util/utilFunc");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const slugTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: "slug",
      value: slugTitle,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const singlePostTemplate = path.resolve("src/components/Singlepost.js");
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  const posts = data.allMarkdownRemark.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: singlePostTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
