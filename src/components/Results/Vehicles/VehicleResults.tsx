import { Vehicle } from "@/shared/types";
import { FC } from "react";

type VehicleResultsProps = {
  vehicles?: Vehicle[];
};

const VehicleResults: FC<VehicleResultsProps> = ({ vehicles }) => {
  return (
    <section className="w-full flex flex-col flex-wrap">
      <div className="flex flex-col flex-wrap w-full mb-2">
        <ul className="w-full rounded flex flex-row flex-wrap bg-white">
          {vehicles?.map((vehicle, index) => (
            <li className="w-full h-16" key={index}>
              {vehicle.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default VehicleResults;
