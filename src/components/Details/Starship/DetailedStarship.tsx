import { Starship } from "@/shared/types";
import { FC } from "react";
import Image from "next/image";
import starshipImg from "../../../../public/images/starship.jpg";
import FilmSearchResult from "@/components/Search/Film/FilmSearchResult";

type DetailedStarshipProps = {
  starship: Starship;
};

const DetailedStarship: FC<DetailedStarshipProps> = ({
  starship: {
    name,
    model,
    films,
    manufacturer,
    starship_class,
    cost_in_credits,
    cargo_capacity,
    created,
    edited,
    crew,
    passengers,
    max_atmosphering_speed,
  },
}) => {
  return (
    <div className="flex flex-row flex-nowrap gap-3 w-full">
      <Image
        alt="starship-picture"
        className="block"
        width={500}
        height={500}
        style={{ width: "50%" }}
        src={starshipImg.src}
      />
      <div className="flex-grow bg-white text-xl font-bold flex-col flex-wrap gap-3">
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Name: {name}</div>
          <div>Model: {model}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Starship class: {starship_class}</div>
          <div>Manufacturer: {manufacturer}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div className="w-full">
            Movies:&nbsp;
            {films.map((film, index) => (
              <span className="pl-1" key={index}>
                <FilmSearchResult filmUrl={film} />
                {index !== films.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Cost: {cost_in_credits}</div>
          <div>Length: {length}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Crew: {crew}</div>
          <div>Passengers: {passengers}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Max athmospheric speed: {max_atmosphering_speed}</div>
          <div>Cargo capacity: {cargo_capacity}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Created: {new Date(created).toLocaleDateString()}</div>
          <div>Edited: {new Date(edited).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStarship;
