import { createContext, useContext, useReducer } from "react";

const NewBookingContext = createContext();

const initialState = {
  numOfGuest: 0,
  selectedCabinName: "",
  selectedCabinData: null,
  showDetailsBox: false,
  guestData: null,
  bookingData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateNumberOfGuest":
      return {
        ...state,
        numOfGuest: action.payload,
        selectedCabinName: "",
        selectedCabinData: null,
        showDetailsBox: false,
        guestData: null,
        bookingData: null,
      };

    case "selectCabin":
      return {
        ...state,
        selectedCabinName: action.payload.name,
        selectedCabinData: action.payload,
      };

    case "showDetails":
      return {
        ...state,
        guestData: action.payload.guestData,
        bookingData: action.payload.bookingData,
        showDetailsBox: true,
      };

    case "resetShowDetails":
      return {
        ...state,
        showDetailsBox: false,
        guestData: null,
        bookingData: null,
      };

    default:
      throw new Error(`Can't perform the requested action`);
  }
};

const NewBookingProvider = ({ children }) => {
  const [
    {
      numOfGuest,
      selectedCabinName,
      selectedCabinData,
      showDetailsBox,
      guestData,
      bookingData,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <NewBookingContext.Provider
      value={{
        numOfGuest,
        selectedCabinName,
        selectedCabinData,
        showDetailsBox,
        guestData,
        bookingData,
        dispatch,
      }}
    >
      {children}
    </NewBookingContext.Provider>
  );
};

const useNewBookingContext = () => {
  const context = useContext(NewBookingContext);

  if (context === undefined) {
    throw new Error("Quiz context was used outside quiz provider");
  }

  return context;
};

export { NewBookingProvider, useNewBookingContext };
