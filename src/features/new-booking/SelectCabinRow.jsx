import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useNewBookingContext } from "../context/NewBookingContext";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const SelectCabinRow = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { selectedCabinName, dispatch } = useNewBookingContext();

  const selectedCabin = selectedCabinName === name;

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Button
          size="small"
          variation={selectedCabin ? "primary" : "secondary"}
          onClick={() => dispatch({ type: "selectCabin", payload: cabin })}
        >
          {selectedCabin ? "Added" : "Select"}
        </Button>
      </Table.Row>
    </>
  );
};

export default SelectCabinRow;
