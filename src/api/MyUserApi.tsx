import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UserHistory = {
  word: string;
  meaning: string;
};

type UserHistorys = {
  word: string;
  meaning: string;
}[];

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name: string;
};

export const useGetMyUserHistory = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserHistoryRequest = async (): Promise<UserHistorys> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user history");
    }

    return response.json();
  };

  const { data: history, isLoading } = useQuery({
    queryKey: ["userHistory"],
    queryFn: getMyUserHistoryRequest,
  });

  return { history, isLoading };
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isError,
    isSuccess,
    isPending,
  } = useMutation({ mutationFn: createMyUserRequest });

  return { createUser, isError, isSuccess, isPending };
};

export const useUpdateMyUserHistory = () => {
  
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserHistory = async (
    userHistory: UserHistory
  ): Promise<UserHistory> => {
    const accessToken = await getAccessTokenSilently();


    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userHistory }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user History");
    }

    return response.json();
  };

  const {
    mutateAsync: updateHistory,
    isError,
    isSuccess,
    isPending,
  } = useMutation({ mutationFn: updateMyUserHistory });

  return { updateHistory, isError, isSuccess, isPending };
};

export const useDeleteMyUserHistory = () => {
  const {getAccessTokenSilently} = useAuth0()

  const deleteMyUserHistory = async (word: string) => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/user`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({word})
    })

    if(!response.ok){
      throw new Error("Failed to delete")
    }

    return response.json()
  }

  const {mutateAsync: deleteWord, isError, isPending, isSuccess} = useMutation({mutationFn: deleteMyUserHistory})

  return {deleteWord, isError, isPending, isSuccess}
};

export const useDeleteMyUserAllHistory = () => {
  const {getAccessTokenSilently} = useAuth0()

  const deleteMyUserAllHistory = async () => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/user/all`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if(!response.ok){
      throw new Error("Failed to delete user all history")
    }

    return response.json()
  }

  const {mutateAsync: deleteHistory, isError, isPending, isSuccess} = useMutation({mutationFn: deleteMyUserAllHistory})

  return {deleteHistory, isError, isPending, isSuccess}
};