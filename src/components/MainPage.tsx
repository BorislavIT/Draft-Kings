import { FC, ReactNode } from "react";

type MainPageProps = {
  children: ReactNode;
};

const MainPage: FC<MainPageProps> = ({ children }) => {
  return (
    <main className="min-h-screen max-w-[1440px] p-8 flex flex-grow h-auto">
      {children}
    </main>
  );
};

export default MainPage;
