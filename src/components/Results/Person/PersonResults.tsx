import { Person } from "@/shared/types";
import { FC } from "react";

type PersonResultProps = {
  people?: Person[];
};

const PersonResults: FC<PersonResultProps> = ({ people }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {people?.map((person, index) => (
            <li className="w-full h-16" key={index}>
              {person.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PersonResults;
