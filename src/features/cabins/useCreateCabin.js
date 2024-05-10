import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  // Creating a INSERT function which would add a cabin row from db when the add btn is clicked
  // 1. Create a mutation function
  // 2. invalidate previous cabin data
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("New Cabin is added");
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
};
