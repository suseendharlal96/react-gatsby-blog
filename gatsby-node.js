const path = require("path");

const slugify = require("./src/util/utilFunc");
const authors = require("./src/util/authors");

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
  const template = {
    single: path.resolve("src/components/Singlepost.js"),
    tags: path.resolve("src/components/tags.js"),
    tag: path.resolve("src/components/SingleTag.js"),
    pagination: path.resolve("src/components/PostPage.js"),
  };
  const { data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  if (data) {
    const posts = data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: template.single,
        context: {
          slug: node.fields.slug,
          imageurl: authors.find(
            (a) =>
              a.name.toLowerCase() === node.frontmatter.author.toLowerCase()
          ).imageurl,
        },
      });
    });

    let tags = [];
    posts.forEach(({ node }) => {
      if (node && node.frontmatter.tags) {
        tags = tags.concat(node.frontmatter.tags);
      }
    });
    const uniqueTags = [...new Set(tags)];

    let tagCount = {};
    tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });

    createPage({
      path: "/tags",
      component: template.tags,
      context: {
        tags: uniqueTags,
        tagCount,
      },
    });

    uniqueTags.forEach((tag) => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: template.tag,
        context: { tag },
      });
    });

    const postsPerPage = 2;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: totalPages }).map((_, index) => {
      const currentPage = index + 1;
      if (index === 0) {
        return;
      } else {
        createPage({
          path: `/page/${currentPage}`,
          component: template.pagination,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            currentPage,
            totalPages
          },
        });
      } 
    });
  }
};
