"use client";
import { Planet } from "@/shared/types";
import { FC } from "react";
import { useRouter } from "next/router";
import { onDetailsClicked } from "../utils";
import { SEARCH_CATEGORIES } from "../constants";
import planetImg from "../../../../public/images/planet.jpg";
import Image from "next/image";

type PlanetSearchResultType = {
  planet: Planet;
};

const PlanetSearchResult: FC<PlanetSearchResultType> = ({
  planet,
  planet: { name, diameter },
}) => {
  const router = useRouter();

  return (
    <li
      role="option"
      aria-selected="false"
      className="w-full h-16 flex flex-row flex-nowrap gap-2 pb-2 border-b-2 last:border-none border-gray-200 cursor-pointer hover:bg-gray-100 p-2"
      onMouseDown={() =>
        onDetailsClicked(
          {
            ...planet,
            resultType: SEARCH_CATEGORIES.Planets,
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
          src={planetImg.src}
        />
      </section>
      <section className="w-full flex flex-row flex-nowrap">
        <div className="w-full basic-info flex flex-row flex-wrap">
          <div className="w-full">
            <div className="max-w-[calc(100%-80px)] text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
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
