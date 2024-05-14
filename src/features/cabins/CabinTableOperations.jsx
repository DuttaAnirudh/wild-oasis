import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  return (
    <TableOperations>
      {/* Filter Row */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      {/* SortBy Row */}
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Price: Low to High " },
          { value: "regularPrice-desc", label: "Price: High to Low " },
          { value: "maxCapacity-asc", label: "Capacity: Low to High" },
          { value: "maxCapacity-desc", label: "Capacity: High to Low" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
