import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import SelectCabinTable from "./SelectCabinTable";

const SelectCabinModal = ({ onCloseModal }) => {
  return (
    <div>
      <Row>
        <Heading as="h3">All cabins</Heading>

        <SelectCabinTable />

        <Button onClick={onCloseModal} alignment="end">
          Done
        </Button>
      </Row>
    </div>
  );
};

export default SelectCabinModal;
