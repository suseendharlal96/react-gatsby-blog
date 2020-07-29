import React from "react";

import { DiscussionEmbed } from "disqus-react";

const SocialLinks = ({ post, slug, id }) => {
  const baseUrl = "https://suseendharlal.in";
  const shortName = "https-suseendharlal-in";
  const disqusConfig = {
    identifier: id,
    title: post.title,
    url: baseUrl + slug,
  };
  return (
    <React.Fragment>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=" + baseUrl + slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook-f fa-lg" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://twitter.com/share?url=" +
                baseUrl +
                slug +
                "&text=" +
                post.title +
                "&via" +
                "twitterHandle"
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-twitter fa-lg" />
            </a>
          </li>
          <li>
            <a
              href={"https://plus.google.com/share?url=" + baseUrl + slug}
              className="google"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-google fa-lg" />
            </a>
          </li>
          <li>
            <a
              href={
                "https://www.linkedin.com/shareArticle?url=" + baseUrl + slug
              }
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-linkedin fa-lg" />
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed shortname={shortName} config={disqusConfig} />
    </React.Fragment>
  );
};

export default SocialLinks;
