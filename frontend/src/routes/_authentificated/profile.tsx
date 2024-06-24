import { createFileRoute } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../../lib/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export const Route = createFileRoute("/_authentificated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, error, data } = useQuery(userQueryOptions);

  if (isPending) return "Loading ...";
  if (error) return "not logged in";

  return (
    <div className="p-2">
      <Card className="text-center max-w-lg m-auto bg-green-950 bg-opacity-10 rounded-xl shadow-md shadow-green-500/[0.1]">
        <CardHeader>
          <CardTitle className="m-auto">
            <Avatar className="w-20 h-auto">
              {data.user.picture && <AvatarImage src={data.user.picture} />}
              <AvatarFallback>{data.user.given_name}</AvatarFallback>
            </Avatar>
          </CardTitle>
          <CardDescription>
          <p>{data.user.given_name} {data.user.family_name}</p>
          <p>{data.user.email}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="hover:bg-red-500 hover:bg-opacity-50 hover:text-white">
            <a href="/api/logout">Log out</a>
          </Button>
          
        </CardContent>
      </Card>

      
    </div>
  );
}
