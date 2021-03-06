import React from "react";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import slugify from "../util/utilFunc";

const PaginationPage = ({ currentPage, totalPages, tag }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage =
    currentPage - 1 === 1
      ? tag
        ? `/tag/${slugify(tag)}/`
        : "/"
      : tag
      ? `/tags/${slugify(tag)}/${currentPage - 1}`
      : `/page/${currentPage - 1}`;
  const nextPage = tag
    ? `/tags/${slugify(tag)}/${currentPage + 1}`
    : `/page/${currentPage + 1}`;
  return (
    <Pagination aria-label="Page navigation example">
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink previous href="" />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={prevPage} />
        </PaginationItem>
      )}
      {Array.from({ length: totalPages }, (_, index) =>
        currentPage === index + 1 ? (
          <PaginationItem active key={index}>
            <PaginationLink
              href={`${
                index === 0
                  ? tag
                    ? `/tag/${slugify(tag)}/`
                    : "/"
                  : tag
                  ? `/tags/${slugify(tag)}/${index + 1}`
                  : `/page/${index + 1}`
              }`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={index}>
            <PaginationLink
              href={`${
                index === 0
                  ? tag
                    ? `/tag/${slugify(tag)}/`
                    : "/"
                  : tag
                  ? `/tags/${slugify(tag)}/${index + 1}`
                  : `/page/${index + 1}`
              }`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}
      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink next href="" />
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage} />
        </PaginationItem>
      )}
    </Pagination>
  );
};

export default PaginationPage;
