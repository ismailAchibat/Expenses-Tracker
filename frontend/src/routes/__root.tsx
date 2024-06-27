import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";

import { CiMenuFries } from "react-icons/ci";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div className="p-2 flex justify-between mx-10">
      <Link to="/" className="text-xl font-semibold">
        <span className="text-green-500">Expenses</span> Tracker
      </Link>
      <div className="md:flex gap-4 max-w-2xl hidden">
        <Link
          to="/"
          className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
        >
          About
        </Link>
        <Link
          to="/expenses"
          className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
        >
          Expenses
        </Link>
        <Link
          to="/create_expense"
          className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
        >
          Create Expense
        </Link>
        <Link
          to="/profile"
          className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
        >
          Profile
        </Link>
      </div>
      <div className="md:hidden flex items-center text-white">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <CiMenuFries />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link
                  to="/"
                  className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
                >
                  Home
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  to="/about"
                  className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
                >
                  About
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  to="/expenses"
                  className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
                >
                  Expenses
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  to="/create_expense"
                  className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
                >
                  Create Expense
                </Link>
              </MenubarItem>
              <MenubarItem>
                <Link
                  to="/profile"
                  className="[&.active]:font-bold [&.active]:text-green-500 hover:text-green-300"
                >
                  Profile
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 ">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
