import { Person } from "@/shared/types";
import { FC, Fragment } from "react";
import PersonSearchResult from "@/components/Search/Person/PersonSearchResult";

type PersonResultProps = {
  people?: Person[];
};

const PersonResults: FC<PersonResultProps> = ({ people }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {people?.map((person, index) => (
            <Fragment key={index}>
              <PersonSearchResult person={person} />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PersonResults;
