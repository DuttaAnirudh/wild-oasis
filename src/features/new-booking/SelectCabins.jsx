import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import SelectCabinModal from "./SelectCabinModal";

const SelectCabins = () => {
  return (
    <Modal>
      <Modal.Open opens="select-cabin">
        <Button type="button" size="small">
          Add Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="select-cabin">
        <SelectCabinModal />
      </Modal.Window>
    </Modal>
  );
};

export default SelectCabins;
