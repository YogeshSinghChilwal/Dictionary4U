import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  searchQuery: z
    .string()
    .min(2, { message: "Word must be at least 2 characters long" })
    .max(30, { message: "Max length is 30 characters" })
    .refine((val) => isNaN(Number(val)), {
      message: "Data must not be a number!",
    }),
});

const SearchBar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(value: z.infer<typeof formSchema>) {
    navigate({
      pathname: `/search/${value.searchQuery}`,
    });
  }

  return (
    <div className="md:flex-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 ">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="" {...field} className="flex-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Search</Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
