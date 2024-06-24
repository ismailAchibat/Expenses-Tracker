import { hc } from 'hono/client'
import { type ApiRoutes} from '../../../server/app'
import { queryOptions } from '@tanstack/react-query';


const client = hc<ApiRoutes>('/');
export const api = client.api;


//get current user
async function getCurrentUser() {
    const res = await api["me"].$get();
    if (!res.ok) {
      console.log('No user is logged in!!!')
    }
    const data = await res.json();
    return data;
  }


export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity
});

//get all expenses

export async function getAllExpeneses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpeneses,
  staleTime: 1000*60*5
});


//get total spent

export async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
}

//delete an expense

export async function deleteMutuation({id}: {id: number}){
  const res = await api.expenses[':id{[0-9]+}'].$delete({param: {id: id.toString()}});
  if (!res.ok) {
    console.error("Delete request failed", res);
    throw new Error("Server Error");
  }
}