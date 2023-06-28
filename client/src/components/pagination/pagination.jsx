import "./scss/pagination.css";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
    <div className="pagination_container">
      <nav className="pagination">
        {pageNumbers.map((number) => (
          <li
            onClick={() => paginate(number)}
            key={number}
            className="page-item"
          >
            <span href="!#" onClick={() => paginate(number)} className="pageLink">
              {number}</span>
          </li>
        ))}
      </nav>
    </div>
  );
}

export default Pagination;
