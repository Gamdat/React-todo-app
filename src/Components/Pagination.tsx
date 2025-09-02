interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;

}



export default function Pagination({ page, limit, total, onPageChange }: Props) {

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;


  function go(n: number) {
    if (n < 1 || n > totalPages) return;
    onPageChange(n);
  }

  return (
    <nav className="pagination" aria-label="Todos pagination">
      <button disabled={!canPrev} onClick={() => go(page - 1)}>Prev</button>
      <span className="page-indicator">
        Page {page} / {totalPages} ({total} items)
      </span>
      <button disabled={!canNext} onClick={() => go(page + 1)}>Next</button>

    </nav>

  );

}

