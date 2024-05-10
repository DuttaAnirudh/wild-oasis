import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  // Creating a DELETE function which would a cabin row from db when the delete btn is clicked
  // 1. Create a mutation function
  // 2. invalidate previous cabin data
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
};
