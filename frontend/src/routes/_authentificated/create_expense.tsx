import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "@tanstack/react-form";
import { api, getAllExpensesQueryOptions } from "../../lib/api";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { createExpenseSchema } from "../../../../server/sharedTypes";
import { Calendar } from "../../components/ui/calendar";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_authentificated/create_expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      try {
        const existingExpense = await queryClient.ensureQueryData(
          getAllExpensesQueryOptions
        );

        const res = await api.expenses.$post({ json: value });

        if (!res.ok) {
          throw new Error("server error");
        }

        const newExpense = (await res.json()).result;
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existingExpense,
          expenses: [newExpense, ...existingExpense.expenses],
        });

        navigate({ to: "/expenses" });
        toast("Expense Created", {
          description: `Successfuly Created expense: ${newExpense.id}`,
        });
      } catch (error) {
        toast("Error", {
          description: 'Failed to created expense',
        });
      }
    },
  });
  return (
    <div className="p-2 mt-5">
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <form.Field
              name="title"
              validators={{
                onChange: createExpenseSchema.shape.title,
              }}
              children={(field) => (
                <div>
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-green-950 bg-opacity-10 "
                  />
                  {field.state.meta.touchedErrors ? (
                    <em>{field.state.meta.touchedErrors}</em>
                  ) : null}
                  {field.state.meta.isValidating ? "Validating..." : null}
                </div>
              )}
            />
            <form.Field
              name="amount"
              validators={{
                onChange: createExpenseSchema.shape.amount,
              }}
              children={(field) => (
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    type="number"
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-green-950 bg-opacity-10"
                  />
                  {field.state.meta.touchedErrors ? (
                    <em>{field.state.meta.touchedErrors}</em>
                  ) : null}
                  {field.state.meta.isValidating ? "Validating..." : null}
                </div>
              )}
            />
          </div>
          <div className="m-auto">
            <form.Field
              name="date"
              validators={{
                onChange: createExpenseSchema.shape.date,
              }}
              children={(field) => (
                <div className="self-center">
                  <Calendar
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(date) =>
                      field.handleChange((date ?? new Date()).toISOString())
                    }
                    className="rounded-md border bg-green-950 bg-opacity-10"
                  />
                  {field.state.meta.touchedErrors ? (
                    <em>{field.state.meta.touchedErrors}</em>
                  ) : null}
                  {field.state.meta.isValidating ? "Validating..." : null}
                </div>
              )}
            />
          </div>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              className="hover:bg-green-500 mt-2 md:w-40 m-auto"
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
