import { Starship } from "@/shared/types";
import { FC } from "react";

type StarshipResultsProps = {
  starships?: Starship[];
};

const StarshipResults: FC<StarshipResultsProps> = ({ starships }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {starships?.map((starship, index) => (
            <li className="w-full h-16" key={index}>
              {starship.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StarshipResults;
