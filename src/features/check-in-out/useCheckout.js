import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout(bookingId) {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: () =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully checked out`);
      void queryClient.invalidateQueries();
    },

    onError() {
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}
