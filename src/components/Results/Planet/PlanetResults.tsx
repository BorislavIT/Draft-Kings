import PlanetSearchResult from "@/components/Search/Planet/PlanetSearchResult";
import { Planet } from "@/shared/types";
import { FC, Fragment } from "react";

type PlanetResultsProps = {
  planets?: Planet[];
};

const PlanetResults: FC<PlanetResultsProps> = ({ planets }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {planets?.map((planet, index) => (
            <Fragment key={index}>
              <PlanetSearchResult planet={planet} />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlanetResults;
