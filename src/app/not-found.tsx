import Link from "next/link";
import bg from "../../public/images/bg.jpg";

export const metadata = {
  title: "404 - Not Found",
  description: "This page is shown when the requested page is not found.",
};

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="z-[-1]">
        <div
          className="bg h-screen w-screen fixed inset-0 z-[-1]"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="bg-overlay fixed inset-0 bg-black bg-opacity-70"></div>
      </div>
      <div className="flex flex-col gap-4 items-center z-10 text-white">
        <div className="text-4xl">Page not found!</div>

        <div className="text-2xl text-center">
          <Link href={"/"} className="underline">
            Click here to go back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
