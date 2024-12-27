import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_FREE_DICTIONARY_API;

export const useFetchMyWord = (value: string) => {
  const fetchValue = async (): Promise<any> => { // Replace `any` with the expected data type
    const response = await fetch(`${API_BASE_URL}${value}`);
    if (!response.ok) {
      throw new Error("Failed to fetch value");
    }
    return response.json();
  };

  const { data: fetchedValue, isLoading, isError } = useQuery(
    { queryKey: ['todos', value], queryFn: fetchValue , enabled: !!value, staleTime: 0, refetchOnWindowFocus: false}
  );

  if(isError){
    toast.error("Word not found!")
  }

  return { fetchedValue, isLoading };
};
