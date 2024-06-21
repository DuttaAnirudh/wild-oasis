import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="check-out">
        <Button variation="primary" size="small">
          Check out
        </Button>
      </Modal.Open>

      <Modal.Window name="check-out">
        <ConfirmDelete
          action="checkout"
          resourceName={`booking #${bookingId}`}
          onConfirm={() => checkout(bookingId)}
          disabled={isCheckingOut}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CheckoutButton;
