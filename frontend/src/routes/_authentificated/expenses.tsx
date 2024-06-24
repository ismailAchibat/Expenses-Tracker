import { createFileRoute } from "@tanstack/react-router";
import { deleteMutuation, getAllExpensesQueryOptions, getTotalSpent } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import ExpenseChart from "../../components/ExpenseChart";

export const Route = createFileRoute("/_authentificated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending: isTotalSpentPending, error: totalSpentError, data: totalSpentData } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });
  if (totalSpentError) return "An error has occurred: " + totalSpentError.message;

  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);

  if (error) return "An error has occurred: " + error.message;

  const chartData =
    data?.expenses.map((expense) => ({
      date: expense.date.split("T")[0],
      amount: Number(expense.amount),
    })) || [];  

  const biggestPurchase = data?.expenses.reduce(
    (max, expense) => (Number(expense.amount) > max ? Number(expense.amount) : max),
    0
  );

  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const spentThisMonth = data?.expenses
    .filter(expense => new Date(expense.date) >= startOfMonth)
    .reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;

  const spentThisWeek = data?.expenses
    .filter(expense => new Date(expense.date) >= startOfWeek)
    .reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;

  console.log("Chart Data:", chartData); // Log the data to verify

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-1/3 w-full h-2/3 flex flex-col space-y-4 bg-green-950 bg-opacity-20 rounded-xl shadow-2xl ">
        <div className="shadow rounded-lg mx-auto">
          {data ? (
            <ExpenseChart data={chartData} />
          ) : (
            <Skeleton className="h-64" />
          )}
        </div>
        <div className="grid grid-cols-2 text-center ">
          <div className=" p-4 shadow rounded-lg">
            <h3 className="text-green-500 text-lg">Total Spent</h3>
            <p className=" text-md font-semibold">${isTotalSpentPending ? '...' : totalSpentData.total}</p>
          </div>
          <div className=" p-4 shadow rounded-lg">
            <h3 className="text-green-500 text-lg">Biggest Purchase</h3>
            <p className="text-md font-semibold">
              {biggestPurchase ? `$${biggestPurchase.toFixed(2)}` : 'no expenses made yet'}
            </p>
          </div>
          <div className=" p-4 shadow rounded-lg">
            <h3 className="text-green-500 text-lg">Spent this Month</h3>
            <p className="text-md font-semibold">
              {spentThisMonth ? `$${spentThisMonth.toFixed(2)}` : 'no expenses made yet'}
            </p>
          </div>
          <div className=" p-4 shadow rounded-lg">
            <h3 className="text-green-500 text-lg">Spent this Week</h3>
            <p className="text-md font-semibold">
              {spentThisWeek ? `$${spentThisWeek.toFixed(2)}` : 'no expenses made yet'}
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 w-full p-5 bg-green-950 bg-opacity-20 rounded-xl shadow-xl">
        <Table className="w-full shadow rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="text-green-500">Id</TableHead>
              <TableHead className="text-green-500">Title</TableHead>
              <TableHead className="text-green-500">Amount</TableHead>
              <TableHead className="text-green-500">Date</TableHead>
              <TableHead className="text-green-500">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4" />
                      </TableCell>
                    </TableRow>
                  ))
              : data?.expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.date.split("T")[0]}</TableCell>
                    <TableCell>
                      <DeleteExpenseButton id={expense.id} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DeleteExpenseButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMutuation,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense: ${id}`,
      });
      console.log("Error while deleting the expense");
    },
    onSuccess: () => {
      toast("Expense Deleted", {
        description: `Successfully deleted expense: ${id}`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpense) => ({
          ...existingExpense,
          expenses: existingExpense!.expenses.filter((e) => e.id !== id),
        })
      );
    },
  });
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => mutation.mutate({ id })}
      disabled={mutation.isPending}
      className="hover:bg-red-600 hover:bg-opacity-20 hover:text-red-600"
    >
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  );
}

export default Expenses;
