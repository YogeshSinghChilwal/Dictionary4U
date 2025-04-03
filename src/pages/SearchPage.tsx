import { useFetchMyWord } from "@/api/MyDictionaryApi";
import Audio from "@/components/Audio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUpdateMyUserHistory } from "@/api/MyUserApi";
import UserHistoryPage from "./UserHistoryPage";
import { DynamicProgress } from "@/components/DynamicProcess";
import { useQueryClient } from "@tanstack/react-query";

const SearchPage = () => {
  const { value } = useParams();
  const [data, setData] = useState<any[]>([]); // Adjust type based on the fetched data structure :- todo
  const { isAuthenticated } = useAuth0();
  const { updateHistory } = useUpdateMyUserHistory();
  const queryClient = useQueryClient();

  if (!value) {
    return <div>Please provide a word to search.</div>;
  }

  const { fetchedValue, isLoading } = useFetchMyWord(value);

  useEffect(() => {
    if (fetchedValue) {
      setData(fetchedValue);

      if (isAuthenticated && fetchedValue.length > 0) {
        const newEntry = {
          word: fetchedValue[0]?.word,
          meaning: fetchedValue[0]?.meanings?.[0]?.definitions?.[0]?.definition,
        };

        updateHistory(newEntry)
          .then(() =>
            queryClient.invalidateQueries({ queryKey: ["userHistory"] })
          )
          .catch((err) => console.error("Error updating user history:", err));
      }
    }
  }, [fetchedValue, value]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <DynamicProgress isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div>
      {data.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                <span className="text-xl">
                  <span className="font-bold">Word:</span> {data[0]?.word}{" "}
                </span>
                <Audio
                  audioLink={data[0]?.phonetics[0]?.audio}
                  word={data[0]?.word}
                />
              </CardTitle>
              <CardDescription>{data[0]?.phonetics[0]?.text}</CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-lg font-semibold">
                {data[0]?.meanings?.[0]?.partOfSpeech}
              </h2>
              <p>{data[0]?.meanings?.[0]?.definitions?.[0]?.definition}</p>
              <p>
                {data[0]?.meanings?.[0]?.definitions?.[0]?.example && (
                  <span>
                    <span className="text-lg font-semibold">Example: </span>
                    {`${data[0]?.meanings?.[0]?.definitions?.[0]?.example}`}
                  </span>
                )}
              </p>
            </CardContent>
            <CardContent>
              <h2 className="text-lg font-semibold">
                {data[0]?.meanings?.[1]?.partOfSpeech}
              </h2>
              <p>{data[0]?.meanings?.[1]?.definitions?.[0]?.definition}</p>
              <p>
                {data[0]?.meanings?.[1]?.definitions?.[0]?.example && (
                  <span>
                    <span className="text-lg font-semibold">Example: </span>
                    {`${data[0]?.meanings?.[0]?.definitions?.[0]?.example}`}
                  </span>
                )}
              </p>
            </CardContent>
            <CardContent>
              <h2 className="text-lg font-semibold">
                {data[0]?.meanings?.[2]?.partOfSpeech}
              </h2>
              <p>{data[0]?.meanings?.[2]?.definitions?.[0]?.definition}</p>
              <p>
                {data[0]?.meanings?.[2]?.definitions?.[0]?.example && (
                  <span>
                    <span className="text-lg font-semibold">Example: </span>
                    {`${data[0]?.meanings?.[0]?.definitions?.[0]?.example}`}
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          {isAuthenticated && <UserHistoryPage />}
        </>
      ) : (
        <div className="flex justify-center items-center">
          No data available.
        </div>
      )}
    </div>
  );
};

export default SearchPage;
