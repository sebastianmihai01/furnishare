import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        className="pagination"
        style={{ fontSize: "20px", textAlign: "center"}}
      >
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              className="page-link"
              onClick={() => paginate(number)}
              style={{ width: "50px", height: "45px", color: "black", borderRadius:'70px', textAlign:'center' }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
