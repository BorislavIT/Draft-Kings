import { InputText } from "primereact/inputtext";
import { useQueryState } from "nuqs";
import { useSWQuery } from "@/shared/useRequestProcessor";
import { Person, Planet, Starship, Vehicle } from "@/shared/types";
import { Dropdown } from "primereact/dropdown";
import dynamic from "next/dynamic";

const SEARCH_CATEGORIES = {
  All: "All",
  People: "People",
  Planets: "Planets",
  Starships: "Starships",
  Vehicles: "Vehicles",
};

const SearchWithResults = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: SEARCH_CATEGORIES.All,
  });

  const { data: people } = useSWQuery<Person[]>(
    ["people", search],
    `/people?search=${search}`,
    category === SEARCH_CATEGORIES.All || category === SEARCH_CATEGORIES.People
  );

  const { data: planets } = useSWQuery<Planet[]>(
    ["planet", search],
    `/planets?search=${search}`,
    category === SEARCH_CATEGORIES.All || category === SEARCH_CATEGORIES.Planets
  );

  const { data: starships } = useSWQuery<Starship[]>(
    ["starship", search],
    `/starships?search=${search}`,
    category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Starships
  );

  const { data: vehicles } = useSWQuery<Vehicle[]>(
    ["vehicle", search],
    `/vehicles?search=${search}`,
    category === SEARCH_CATEGORIES.All ||
      category === SEARCH_CATEGORIES.Vehicles
  );

  return (
    <div className="p-input-icon-right relative w-full flex flow-nowrap">
      <Dropdown
        className="rounded-tr-none rounded-br-none"
        value={category}
        onChange={(e) => setCategory(e.target.value || null)}
        options={Array.from(Object.keys(SEARCH_CATEGORIES))}
      />
      <i className="pi pi-search z-10" />
      <InputText
        placeholder="Search"
        className="rounded-tl-none rounded-bl-none flex-grow w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value || null)}
      />
    </div>
  );
};

// we need to do this, because otherwise if a user selects a category and refreshes page or sends it to a friend and they open it
// the category server side will be All, but client side will be the selected category, query params is very tricky with SSR
export default dynamic(() => Promise.resolve(SearchWithResults), {
  ssr: false,
});
