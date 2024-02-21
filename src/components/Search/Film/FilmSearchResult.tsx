"use client";
import { Film } from "@/shared/types";
import { FC } from "react";
import { useSWQuery } from "@/shared/queries";

type FilmSearchResultType = {
  filmUrl: string;
};

const FilmSearchResult: FC<FilmSearchResultType> = ({ filmUrl }) => {
  const filmUrlArgs = filmUrl.split("/");
  const filmId = filmUrlArgs[filmUrlArgs.length - 2];

  const { data: film } = useSWQuery<Film>(
    ["person film", filmId],
    `/films/${filmId}`,
    true
  );

  return <span className="font-bold">{film?.title}</span>;
};

export default FilmSearchResult;
