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
    single: path.resolve("src/templates/Singlepost.js"),
    tags: path.resolve("src/templates/tags.js"),
    tag: path.resolve("src/templates/SingleTag.js"),
    pagination: path.resolve("src/templates/PostPage.js"),
    tagPagination: path.resolve("src/templates/tagPagination.js"),
    // team: path.resolve("src/templates/team.js"),
    authorPost: path.resolve("src/templates/AuthorPage.js"),
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
    // single post page
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

    // author page with corresponding posts
    authors.forEach((author) => {
      createPage({
        path: `/author/${slugify(author.name)}`,
        component: template.authorPost,
        context: {
          authorName: author.name,
          imageurl: author.imageurl,
        },
      });
    });

    // all tags page
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

    // single tags page
    uniqueTags.forEach((tag) => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: template.tag,
        context: { tag },
      });
    });

    // pagination for posts

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
            totalPages,
          },
        });
      }
    });

    // pagination if a same tag appears more than twice
    let allTags = {};
    tags.forEach((tag) => {
      allTags[tag] = (allTags[tag] || 0) + 1;
      if (allTags[tag] > 2) {
        const tagsPerPage = 2;
        const totalTagsPages = Math.ceil(allTags[tag] / tagsPerPage);
        Array(totalTagsPages)
          .fill()
          .map((_, index) => {
            const currentPage = index + 1;
            if (currentPage === 1) {
              return;
            } else {
              createPage({
                path: `/tags/${slugify(tag)}/${currentPage}`,
                component: template.tagPagination,
                context: {
                  skip: index * tagsPerPage,
                  limit: tagsPerPage,
                  tag,
                  totalPages: totalTagsPages,
                  tagCount: allTags[tag],
                  currentPage,
                },
              });
            }
          });
      }
    });
  }
};
