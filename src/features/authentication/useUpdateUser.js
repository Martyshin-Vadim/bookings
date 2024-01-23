import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    async onSuccess() {
      toast.success("User account successfully updated");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError(err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isUpdating, updateUser };
}
