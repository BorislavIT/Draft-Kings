"use client";
import { Planet } from "@/shared/types";
import { FC } from "react";
import { SEARCH_CATEGORIES, SearchResultSet } from "../constants";
import planetImg from "../../../../public/images/planet.jpg";
import Image from "next/image";

type PlanetSearchResultType = {
  planet: Planet;
  onSearchResultClicked: (searchResult: SearchResultSet) => void;
};

const PlanetSearchResult: FC<PlanetSearchResultType> = ({
  planet,
  planet: { name, diameter },
  onSearchResultClicked,
}) => {
  return (
    <li
      role="option"
      className="w-full h-16 flex flex-row flex-nowrap gap-2 pb-2 border-b-2 border-gray-200 cursor-pointer hover:bg-gray-100 p-2"
      onClick={() =>
        onSearchResultClicked({
          ...planet,
          resultType: SEARCH_CATEGORIES.Planets,
        })
      }
    >
      <section className="img-container flex-shrink-0">
        <Image
          alt="jedai-picture"
          width={128}
          height={0}
          style={{ height: "100%", width: "80px" }}
          src={planetImg.src}
        />
      </section>
      <section className="w-full flex flex-row flex-nowrap">
        <div className="w-full basic-info flex flex-row flex-wrap">
          <div className="w-full">
            <div className="max-w-[90%] text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
              <span className="font-bold">{name}</span>
            </div>
          </div>
          <div className="w-full">
            Diameter: <span className="font-bold">{diameter}</span>
          </div>
        </div>
      </section>
    </li>
  );
};

export default PlanetSearchResult;