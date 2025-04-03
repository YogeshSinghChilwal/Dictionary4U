import { useDeleteMyUserHistory, useGetMyUserHistory } from "@/api/MyUserApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query"; 
import { AlertDialogComp } from "@/components/AlertDialogComp";


const UserHistoryPage = () => {
  const { history, isLoading } = useGetMyUserHistory();
  const queryClient = useQueryClient();

  const {deleteWord} = useDeleteMyUserHistory()
  
  const handleDelete = async (word: string) => {
    await deleteWord(word); // Call mutation function to delete word
    queryClient.invalidateQueries({ queryKey: ['userHistory'] }); // Invalidate the query to refetch history
  };

  if (isLoading) {
    return "Loading...";
  }
  return (
    <Table className="mt-5 mb-5">
      <TableCaption>A list of your recent searches.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Word</TableHead>
          <TableHead className="text-balance">Meaning</TableHead>
          <TableHead className={`${ history && history.length <= 0 && "hidden"}`}><AlertDialogComp/> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history?.map((userData, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{userData.word}</TableCell>
            <TableCell>{userData.meaning}</TableCell>
            <TableCell className="hover:cursor-pointer " onClick={() => handleDelete(userData.word)} ><Trash2/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserHistoryPage;
