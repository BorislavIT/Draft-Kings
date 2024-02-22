import { Person } from "@/shared/types";
import { FC } from "react";
import Image from "next/image";
import yodaImg from "../../../../public/images/yoda.jpg";
import FilmSearchResult from "@/components/Search/Film/FilmSearchResult";

type DetailedPersonProps = {
  person: Person;
};

const DetailedPerson: FC<DetailedPersonProps> = ({
  person: {
    name,
    height,
    gender,
    eye_color,
    films,
    mass,
    birth_year,
    hair_color,
    homeworld,
  },
}) => {
  return (
    <div className="flex flex-row flex-nowrap gap-3 w-full">
      <Image
        alt="jedai-picture"
        className="block"
        width={500}
        height={500}
        style={{ width: "50%" }}
        src={yodaImg.src}
      />
      <div className="flex-grow bg-white text-xl font-bold flex-col flex-wrap gap-3">
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Name: {name}</div>
          <div>Age: {height}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Gender: {gender}</div>
          <div>Eye Color: {eye_color}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div className="w-full">
            {films.map((film, index) => (
              <span className="pl-1" key={index}>
                <FilmSearchResult filmUrl={film} />
                {index !== films.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Mass: {mass}</div>
          <div>Homeworld: {homeworld}</div>
        </div>
        <div className="w-full p-3 flex flex-row flex-nowrap justify-between items-center border-solid border-b border-black">
          <div>Birh year: {birth_year}</div>
          <div>Hair color: {hair_color}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPerson;
