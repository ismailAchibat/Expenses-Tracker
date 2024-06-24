import { createFileRoute } from "@tanstack/react-router";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import im from "../assets/expenses_page.png";
import { SparklesCore } from "../components/ui/sparkles";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col md:flex-row justify-around">
      <div className="flex justify-center align-middle items-center">
        <div className=" w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
          <h1 className="md:text-5xl text-5xl mt-20 lg:text-7xl font-bold text-center text-white relative z-20">
            <span className="text-green-500">Expenses</span> Tracker
          </h1>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-800 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-green-800 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-green-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1000}
              className="w-full h-full m-auto"
              particleColor="#22C55E"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black-custom [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
      </div>
      <div className=" ">
        <CardContainer className="">
          <CardBody className="relative group/card dark:hover:shadow-2xl shadow-2xl shadow-green-500/[0.2] dark:hover:shadow-green-500/[0.3] bg-green-950 bg-opacity-10 dark:border-white/[0.2] border-green-900/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border min-h-0">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white text-center"
            >
              Track and manage your expenses effortlessly with our intuitive app
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <img
                src={im}
                className="w-full max-w-full rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-center items-center mt-8">
              <a href="/api/login">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-md hover:text-white font-bold"
                >
                  Start Now
                </CardItem>
              </a>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}

export default Index;
