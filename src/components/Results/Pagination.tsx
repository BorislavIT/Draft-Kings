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
    setPage: (newPage: string) => void
  ) => {
    if (newPage < 1) return;
    setPage(newPage.toString());
  };

  return {
    page,
    setPage,
    onNewPageClicked,
  };
};

const Pagination: FC<{
  totalPages: number;
  setPage: (newPage: string) => void;
  onNewPageClicked: (
    newPage: number,
    setPage: (newPage: string) => void
  ) => void;
}> = ({ totalPages, setPage, onNewPageClicked }) => {
  return (
    <ul className="pagination flex flex-row flex-nowrap justify-end w-full text-white mt-4 h-12">
      {Array.from({
        length: totalPages,
      }).map((_, index) => (
        <li
          key={index}
          className="border border-solid border-gray-200 hover:bg-gray-200 p-3 cursor-pointer bg-white text-black flex justify-center items-center"
          onClick={() => onNewPageClicked(index + 1, setPage)}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
