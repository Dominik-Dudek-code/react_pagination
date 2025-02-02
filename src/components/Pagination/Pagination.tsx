import { getNumbers } from '../../utils';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const maxPagination = Math.ceil(total / perPage);
  const paginations = getNumbers(1, maxPagination);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={event => {
            if (currentPage === 1) {
              event.preventDefault();

              return;
            }

            onPageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {paginations.map(pagination => {
        return (
          <li
            className={`page-item ${pagination === currentPage ? 'active' : ''}`}
            key={pagination}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pagination}`}
              onClick={() => onPageChange(pagination)}
            >
              {pagination}
            </a>
          </li>
        );
      })}

      <li
        className={`page-item ${currentPage === maxPagination ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === maxPagination}
          onClick={event => {
            if (currentPage === maxPagination) {
              event.preventDefault();

              return;
            }

            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
