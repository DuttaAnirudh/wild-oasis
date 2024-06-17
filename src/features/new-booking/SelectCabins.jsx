import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useNewBookingContext } from "../context/NewBookingContext";
import SelectCabinModal from "./SelectCabinModal";

const SelectCabins = () => {
  const { selectedCabinName } = useNewBookingContext();

  return (
    <Modal>
      <Modal.Open opens="select-cabin">
        <Button type="button" size="small">
          {selectedCabinName === "" ? "Add" : "Change"} Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="select-cabin">
        <SelectCabinModal />
      </Modal.Window>
    </Modal>
  );
};

export default SelectCabins;
