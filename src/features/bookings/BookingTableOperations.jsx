import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const BookingTableOperations = () => {
  return (
    <TableOperations>
      {/* Filter Operations */}
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked In" },
          { value: "checked-out", label: "Checked Out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Check In date: (Latest first)" },
          { value: "startDate-asc", label: "Check In date (Oldest first)" },
          {
            value: "totalPrice-desc",
            label: "Amount: High to Low",
          },
          { value: "totalPrice-asc", label: "Amount: Low to High" },
        ]}
      />
    </TableOperations>
  );
};

export default BookingTableOperations;
