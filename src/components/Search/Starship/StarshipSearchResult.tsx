"use client";
import { Starship } from "@/shared/types";
import { FC } from "react";
import { onDetailsClicked } from "../utils";
import { useRouter } from "next/router";
import { SEARCH_CATEGORIES } from "../constants";
import starshipImg from "../../../../public/images/starship.jpg";
import Image from "next/image";

type StarshipSearchResultType = {
  starship: Starship;
};

const StarshipSearchResult: FC<StarshipSearchResultType> = ({
  starship,
  starship: { name, model },
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
            ...starship,
            resultType: SEARCH_CATEGORIES.Starships,
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
          src={starshipImg.src}
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
            Model: <span className="font-bold">{model}</span>
          </div>
        </div>
      </section>
    </li>
  );
};

export default StarshipSearchResult;
