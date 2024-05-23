import { HiOutlineBriefcase } from "react-icons/hi";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Statistics = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  // 1. Number of Bookings
  const numBookings = bookings.length;

  // 2. Total Sales
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Total Checkins
  const totalCheckins = confirmedStays.length;

  // 4. Occupany Rate
  // number of checkins in one night / all available nights (num of days * num of cabins)
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
};

export default Statistics;
