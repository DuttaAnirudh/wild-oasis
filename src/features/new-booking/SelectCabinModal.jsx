import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import SelectCabinTable from "./SelectCabinTable";

const SelectCabinModal = () => {
  return (
    <div>
      <Row>
        <Heading as="h3">All cabins</Heading>

        <SelectCabinTable />

        <Button alignment="end">Done</Button>
      </Row>
    </div>
  );
};

export default SelectCabinModal;
