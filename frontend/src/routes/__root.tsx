import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Toaster } from "../components/ui/sonner";


export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {

  return (
    <div className="p-2 flex justify-between mx-10">
      <Link to='/' className="text-xl font-semibold">
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
