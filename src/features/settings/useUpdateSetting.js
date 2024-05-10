import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  // Creating a INSERT function which would add a setting row from db when the add btn is clicked
  // 1. Create a mutation function
  // 2. invalidate previous setting data
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Setting successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
};
