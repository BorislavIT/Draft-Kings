import VehicleSearchResult from "@/components/Search/Vehicle/VehicleSearchResult";
import { Vehicle } from "@/shared/types";
import { FC, Fragment } from "react";

type VehicleResultsProps = {
  vehicles?: Vehicle[];
};

const VehicleResults: FC<VehicleResultsProps> = ({ vehicles }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {vehicles?.map((vehicle, index) => (
            <Fragment key={index}>
              <VehicleSearchResult vehicle={vehicle} />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VehicleResults;
