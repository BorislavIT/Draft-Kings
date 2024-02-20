import { Button, ButtonProps } from "primereact/button";
import { FC } from "react";

const CustomButton: FC<ButtonProps> = (props) => {
  return (
    <Button className="focus:shadow-none border border-solid p-2" {...props} />
  );
};

export default CustomButton;
