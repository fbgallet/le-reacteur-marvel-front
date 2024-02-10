import { useEffect, useState } from "react";

const accessiblePageNb = 5;

const PageNavigation = ({ count, currentPage, setCurrentPage }) => {
  const totalPageNb = Math.ceil(count / 100);
  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
    const getAccessiblePagesArray = () => {
      const result = [];
      const pageRangeMin =
        currentPage % 5 ? currentPage - (currentPage % 5) + 1 : currentPage - 4;
      for (
        let i = pageRangeMin;
        i < pageRangeMin + accessiblePageNb && i <= totalPageNb;
        i++
      ) {
        result.push(i);
      }
      return result;
    };

    setPagesArray(getAccessiblePagesArray(currentPage));
  }, [currentPage, count]);

  return (
    <div className="page-navigation">
      <span
        className="nav-button"
        onClick={() => setCurrentPage(pagesArray[0] - 5)}
      >
        {totalPageNb > 5 && currentPage > 5 ? "❮" : ""}
      </span>

      {totalPageNb > 1 &&
        pagesArray.map((pageNb, index) => (
          <span
            key={index}
            onClick={() => {
              setCurrentPage(pageNb);
            }}
          >
            {pageNb === currentPage ? (
              <span className="current-page">{pageNb}</span>
            ) : (
              <a>{pageNb}</a>
            )}
          </span>
        ))}
      {totalPageNb > 1 && pagesArray.at(-1) !== totalPageNb && (
        <>
          <span>...</span>
          <span onClick={() => setCurrentPage(totalPageNb)}>
            <a>{totalPageNb}</a>
          </span>
        </>
      )}
      <span
        className="nav-button"
        onClick={() => setCurrentPage(pagesArray.at(-1) + 1)}
      >
        {totalPageNb > 5 && totalPageNb !== pagesArray.at(-1) ? "❯" : ""}
      </span>
    </div>
  );
};

export default PageNavigation;
