import { Planet } from "@/shared/types";
import { FC } from "react";

type PlanetResultsProps = {
  planets?: Planet[];
};

const PlanetResults: FC<PlanetResultsProps> = ({ planets }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full mb-2">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {planets?.map((planet, index) => (
            <li className="w-full h-16" key={index}>
              {planet.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlanetResults;
