import { Planet } from "@/shared/types";
import { FC } from "react";
import Image from "next/image";
import planetImg from "../../../../public/images/planet.jpg";
import FilmSearchResult from "@/components/Search/Film/FilmSearchResult";

type DetailedPlanetProps = {
  planet: Planet;
};

const DetailedPlanet: FC<DetailedPlanetProps> = ({
  planet: {
    name,
    diameter,
    rotation_period,
    orbital_period,
    gravity,
    population,
    climate,
    surface_water,
    created,
    edited,
    films,
  },
}) => {
  return (
    <div className="flex flex-row flex-nowrap gap-3 w-full">
      <Image
        alt="planet-picture"
        className="block"
        width={500}
        height={500}
        style={{ width: "50%" }}
        src={planetImg.src}
      />
      <div className="flex-grow bg-white text-xl font-bold flex-col flex-wrap gap-3">
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Name: {name}</div>
          <div>Diameter: {diameter}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Rotation period: {rotation_period}</div>
          <div>Orbital period: {orbital_period}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Gravity: {gravity}</div>
          <div>Population: {population}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Created: {new Date(created).toLocaleDateString()}</div>
          <div>Edited: {new Date(edited).toLocaleDateString()}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Climate: {climate}</div>
          <div>
            {parseInt(surface_water ?? 0) === 1
              ? "Has water"
              : "Doesn't have water"}
          </div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>
            Movies:&nbsp;
            {films.map((film, index) => (
              <span className="pl-1" key={index}>
                <FilmSearchResult filmUrl={film} />
                {index !== films.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPlanet;
