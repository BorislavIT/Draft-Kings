import StarshipSearchResult from "@/components/Search/Starship/StarshipSearchResult";
import { Starship } from "@/shared/types";
import { FC, Fragment } from "react";

type StarshipResultsProps = {
  starships?: Starship[];
};

const StarshipResults: FC<StarshipResultsProps> = ({ starships }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {starships?.map((starship, index) => (
            <Fragment key={index}>
              <StarshipSearchResult starship={starship} />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StarshipResults;
