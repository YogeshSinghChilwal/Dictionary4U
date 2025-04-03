import { useDeleteMyUserAllHistory } from "@/api/MyUserApi"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {  useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
  
  export function AlertDialogComp() {
    const {deleteHistory} = useDeleteMyUserAllHistory()
    const queryClient = useQueryClient()

    const handleDeleteHistory = async() => {
      await deleteHistory()
      queryClient.invalidateQueries({queryKey: ['userHistory']})
    }
    return (
      <AlertDialog >
        <AlertDialogTrigger >
            <Trash2/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteHistory} >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  