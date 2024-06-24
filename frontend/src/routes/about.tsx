import { createFileRoute } from "@tanstack/react-router";
import { FaGreaterThan, FaReact } from "react-icons/fa";
import {
  SiBun,
  SiHono,
  SiZod,
  SiPostgresql,
  SiDrizzle,
  SiShadcnui,
} from "react-icons/si";
import { GiIsland } from "react-icons/gi";
import { TbLetterK } from "react-icons/tb";
import Ismail from "../components/Ismail";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-8">
      <div className="m-auto p-5 text-center flex flex-col gap-4 bg-green-950 bg-opacity-20 rounded-xl shadow-2xl shadow-green-500/[0.1]">
        <p className="text-2xl font-semibold text-green-500">
          Track your expenses!
        </p>
        <p className="max-w-lg">
          This online app will help you effortlessly manage your finances. By
          providing a simple and intuitive interface, you can easily log your
          daily expenses and label them for better insights. Whether you’re
          looking to monitor your spending habits, save for a goal, or just keep
          a close eye on your budget, this app has you covered.
        </p>
      </div>
      <div className="m-auto text-center flex flex-col gap-4 bg-green-950 bg-opacity-20 rounded-xl shadow-2xl shadow-green-500/[0.1]">
        <p className="text-2xl font-semibold text-green-500">About this app</p>
        <div className="max-w-lg space-x-2">
          <p className="inline">This app was developed by </p>
          <Ismail />
          <p className="inline">to practice the new technologies for amodern web app. Below are the different technologies used:</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-bold">Backend</p>
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex flex-col items-center">
              <SiBun size={30} />
              <span>Bun</span>
            </div>
            <div className="flex flex-col items-center">
              <SiHono size={30} />
              <span>Hono</span>
            </div>
            <div className="flex flex-col items-center">
              <SiZod size={30} />
              <span>Zod</span>
            </div>
            <div className="flex flex-col items-center">
              <TbLetterK size={30} />
              <span>Kinde</span>
            </div>
          </div>
          <p className="text-lg font-bold mt-4">Frontend </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col items-center">
              <FaReact size={30} />
              <span>React</span>
            </div>
            <div className="flex flex-col items-center">
              <GiIsland size={30} />
              <span>TanStack</span>
            </div>
            <div className="flex flex-col items-center">
              <SiShadcnui size={30} />
              <span>Shadcn ui</span>
            </div>
            <div className="flex flex-col items-center">
              <FaGreaterThan size={30} />
              <span>Acernity ui</span>
            </div>
          </div>
          <p className="text-lg font-bold mt-4">Database</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-col items-center">
              <SiPostgresql size={30} />
              <span>Neon PostgreSQL</span>
            </div>
            <div className="flex flex-col items-center">
              <SiDrizzle size={30} />
              <span>Drizzle ORM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
