// Import deps
import React from "react";

// Import styles
import "./../styles/pagination.css";

// Import interfaces
interface PaginationUI {
  nursesPerPage: number;
  totalNurses: number;
  paginate: (number: number) => void;
}

export const Pagination = (props: PaginationUI) => {
  const pageNumbers : number[] = [];
  const totalPages = Math.ceil(props.totalNurses / props.nursesPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">Page: 
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => props.paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

