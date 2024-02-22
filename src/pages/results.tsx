import { FC } from "react";
import SearchWithResults from "@/components/Search/SearchWithResults";
import ResultsContainer from "@/components/Results/ResultsContainer";

const ResultsPage: FC = () => {
  return (
    <section className="w-full h-full">
      <SearchWithResults />
      <ResultsContainer />
    </section>
  );
};

export default ResultsPage;
