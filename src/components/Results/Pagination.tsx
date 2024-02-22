import { useQueryState } from "nuqs";
import { FC, useEffect } from "react";
import { MAX_RESULTS_PER_PAGE } from "./constants";

export const usePageSetter = (
  currentStartIndex: number,
  setPage: (page: number) => void
) => {
  useEffect(() => {
    if (currentStartIndex >= 0) {
      setPage(Math.floor(currentStartIndex / MAX_RESULTS_PER_PAGE) + 1);
    }
  }, [currentStartIndex, setPage]);
};

export const usePagination = () => {
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
  });

  const onNewPageClicked = (
    newPage: number,
    lastPage: number,
    setPage: (newPage: string) => void
  ) => {
    if (newPage < 1 || newPage > lastPage) return;
    setPage(newPage.toString());
  };

  return {
    page,
    setPage,
    onNewPageClicked,
  };
};

type PaginationProps = {
  totalPages: number;
};

const Pagination: FC<PaginationProps> = ({ totalPages }) => {
  const { page, setPage, onNewPageClicked } = usePagination();

  return (
    <>
      {totalPages && totalPages > 1 && (
        <ul className="pagination flex flex-row flex-nowrap justify-end w-full text-white mt-4 h-12">
          <li
            className={`border border-solid border-gray-200 hover:bg-gray-200 p-3 cursor-pointer bg-white text-black flex justify-center items-center font-bold`}
            onClick={() =>
              onNewPageClicked(parseInt(page) - 1, totalPages, setPage)
            }
          >
            &lt;
          </li>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageIndex = index + 1;
            // github copilot can take credit for this, it did a pretty good job
            // i was showing all pages, but in the imaginary case that there are thousands of results
            // we would have hundreds of pages so for the purpose of the assignment, it should be fine

            // idea is to show first, second, current, second to last, last and up to 2 pages before and after the current page if they exist
            const isRelevantPage =
              pageIndex === 1 ||
              pageIndex === 2 ||
              pageIndex === totalPages - 1 ||
              pageIndex === totalPages ||
              (pageIndex >= parseInt(page) - 2 &&
                pageIndex <= parseInt(page) + 2);

            return isRelevantPage ? (
              <li
                key={index}
                className={`border border-solid border-gray-200 hover:bg-gray-200 p-3 cursor-pointer bg-white text-black flex justify-center items-center font-bold ${
                  parseInt(page) === pageIndex && "text-[#1d4ed8] bg-[#eff6ff]"
                }`}
                onClick={() => onNewPageClicked(pageIndex, totalPages, setPage)}
              >
                {pageIndex}
              </li>
            ) : null;
          })}
          <li
            className={`border border-solid border-gray-200 hover:bg-gray-200 p-3 cursor-pointer bg-white text-black flex justify-center items-center font-bold`}
            onClick={() =>
              onNewPageClicked(parseInt(page) + 1, totalPages, setPage)
            }
          >
            &gt;
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
