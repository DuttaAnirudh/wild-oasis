import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  // Creating a INSERT function which would add a cabin row from db when the add btn is clicked
  // 1. Create a mutation function
  // 2. invalidate previous cabin data
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createOrEditCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("Cabin successfully edited");
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
};
