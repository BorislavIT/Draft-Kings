"use client";
import { Person, Planet } from "@/shared/types";
import { FC } from "react";
import { useSWQuery } from "@/shared/queries";
import { useRouter } from "next/router";
import { onDetailsClicked } from "../utils";
import { SEARCH_CATEGORIES } from "../constants";
import yoda from "../../../../public/images/yoda.jpg";
import Image from "next/image";
import FilmSearchResult from "../Film/FilmSearchResult";

type PersonSearchResultProps = {
  person: Person;
};

const PersonSearchResult: FC<PersonSearchResultProps> = ({
  person,
  person: { homeworld, name, birth_year, films },
}) => {
  const router = useRouter();

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
      aria-selected="false"
      className="w-full h-16 flex flex-row flex-nowrap gap-2 pb-2 border-b-2 last:border-none border-gray-200 cursor-pointer hover:bg-gray-100 p-2"
      onMouseDown={() =>
        onDetailsClicked(
          {
            ...person,
            resultType: SEARCH_CATEGORIES.People,
          },
          router
        )
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
            <div className="max-w-[calc(100%-80px)] text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
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
