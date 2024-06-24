import { Outlet, createFileRoute } from "@tanstack/react-router"
import { userQueryOptions } from "../lib/api";
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";


const Login = () => {
  return(
    <div className="flex text-center p-4 justify-center mt-8 ">
      <Card className="max-w-lg p-2 bg-green-900 bg-opacity-10 shadow-md shadow-green-500/[0.1]">
        <CardTitle className="mt-2">You need to be logged in !</CardTitle>
        <CardDescription className="mt-2">In order to visit this page, please log in or register </CardDescription>
        <CardContent className="flex flex-row gap-4 justify-center mt-4">
          <Button asChild>
            <a href="/api/login">Login</a>
          </Button>
          <Button asChild>
            <a href="/api/register">Register</a>
          </Button>
        </CardContent>
      </Card>
      
    </div>
  )
}


const Component = () => {
  const {user} = Route.useRouteContext();
  if (!user) {
    return <Login />
  }

  return <Outlet />
}


export const Route = createFileRoute('/_authentificated')({
  beforeLoad: async ({context}) => {
    const queryClient = context.queryClient;
    try {
      const data = queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (error) {
      return {user: null};
    }
    
  },
  component: Component
})


 
