import Spinner from "../../ui/Spinner";
import SelectCabinRow from "./SelectCabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useFetchCabins } from "./useFetchCabins";

const SelectCabinTable = () => {
  const { isLoading, cabins, error } = useFetchCabins();

  const numOfGuests = 4; // TEST

  const availableCabins = cabins.filter((cabin) => cabin.maxCapacity >= 4);
  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="Cabin" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>MAX. Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={availableCabins}
          render={(cabin) => <SelectCabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default SelectCabinTable;
