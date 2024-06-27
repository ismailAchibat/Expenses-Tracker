import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "../components/ui/sonner";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-2 flex justify-between mx-10">
      <Link to="/" className="text-xl font-semibold">
        <span className="text-green-500">Expenses</span> Tracker
      </Link>
      <div className="md:flex gap-4 max-w-2xl hidden">
        <Link to="/" className="[&.active]:font-bold [&.active]:text-green-500">
          Home
        </Link>
        <Link
          to="/about"
          className="[&.active]:font-bold [&.active]:text-green-500"
        >
          About
        </Link>
        <Link
          to="/expenses"
          className="[&.active]:font-bold [&.active]:text-green-500"
        >
          Expenses
        </Link>
        <Link
          to="/create_expense"
          className="[&.active]:font-bold [&.active]:text-green-500"
        >
          Create Expense
        </Link>
        <Link
          to="/profile"
          className="[&.active]:font-bold [&.active]:text-green-500"
        >
          Profile
        </Link>
      </div>
      <div className="md:hidden flex items-center text-white">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <CiMenuFries />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerDescription>
                <div className="flex flex-col text-lg">
                  <Link
                    to="/"
                    className="[&.active]:font-bold [&.active]:text-green-500"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="[&.active]:font-bold [&.active]:text-green-500"
                  >
                    About
                  </Link>
                  <Link
                    to="/expenses"
                    className="[&.active]:font-bold [&.active]:text-green-500"
                  >
                    Expenses
                  </Link>
                  <Link
                    to="/create_expense"
                    className="[&.active]:font-bold [&.active]:text-green-500"
                  >
                    Create Expense
                  </Link>
                  <Link
                    to="/profile"
                    className="[&.active]:font-bold [&.active]:text-green-500"
                  >
                    Profile
                  </Link>
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <Toaster />
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
