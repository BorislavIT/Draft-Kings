import SearchWithResults from "@/components/Search/SearchWithResults";
import DetailsContainer from "@/components/Details/DetailsContainer";

export default function DetailsPage() {
  return (
    <div className="w-full h-full">
      <SearchWithResults />
      <DetailsContainer />
    </div>
  );
}
