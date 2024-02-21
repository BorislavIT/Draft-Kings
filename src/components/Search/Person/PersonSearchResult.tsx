"use client";
import { Person, Planet } from "@/shared/types";
import { FC } from "react";
import { useSWQuery } from "@/shared/queries";
import { SEARCH_CATEGORIES, SearchResultSet } from "../constants";
import yoda from "../../../../public/images/yoda.jpg";
import Image from "next/image";
import FilmSearchResult from "../Film/FilmSearchResult";

type PersonSearchResultProps = {
  person: Person;
  onSearchResultClicked: (searchResult: SearchResultSet) => void;
};

const PersonSearchResult: FC<PersonSearchResultProps> = ({
  person,
  person: { homeworld, name, birth_year, films },
  onSearchResultClicked,
}) => {
  const homeworldUrlArgs = homeworld.split("/");
  const homeworldId = homeworldUrlArgs[homeworldUrlArgs.length - 2];

  const { data: planet } = useSWQuery<Planet>(
    ["person planet", homeworldId],
    `/planets/${homeworldId}`,
    true
  );

  return (
    <li
      role="option"
      className="w-full h-16 flex flex-row flex-nowrap gap-2 pb-2 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-100 p-2"
      onClick={() =>
        onSearchResultClicked({
          ...person,
          resultType: SEARCH_CATEGORIES.People,
        })
      }
    >
      <section className="img-container flex-shrink-0">
        <Image
          alt="jedai-picture"
          width={128}
          height={0}
          style={{ height: "100%", width: "80px" }}
          src={yoda.src}
        />
      </section>
      <section className="w-full flex flex-row flex-nowrap">
        <div className="w-full basic-info flex flex-row flex-wrap">
          <div className="w-full">
            <div className="max-w-[90%] text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
              <span className="font-bold">{name}</span> from&nbsp;
              <span className="font-bold">{planet?.name}</span> who appears in
              {films.map((film, index) => (
                <span className="pl-1" key={index}>
                  <FilmSearchResult filmUrl={film} />
                  {index !== films.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full">Date of Birth: {birth_year}</div>
        </div>
      </section>
    </li>
  );
};

export default PersonSearchResult;
