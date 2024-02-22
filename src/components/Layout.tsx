import { FC, ReactNode } from "react";
import MainPage from "./MainPage";
import bg from "../../public/images/bg.jpg";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="layout-container flex flex-column justify-center flex-wrap z-10">
        <div className="page-container flex flex-row justify-center gap-4 flex-nowrap w-full h-full px-4">
          <div
            className="bg fixed inset-0 min-w-[1948px] w-screen"
            style={{
              backgroundImage: `url(${bg.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              zIndex: -2,
            }}
          ></div>
          <div className="bg-overlay fixed inset-0 bg-black bg-opacity-70 z-[-1]"></div>
          <MainPage>{children}</MainPage>
        </div>
      </div>
    </>
  );
};

export default Layout;
