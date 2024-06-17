import { createContext, useContext, useReducer } from "react";

const NewBookingContext = createContext();

const initialState = {
  numOfGuest: 0,
  selectedCabinName: "",
  selectedCabinData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateNumberOfGuest":
      return { ...state, numOfGuest: action.payload };

    case "selectCabin":
      return {
        ...state,
        selectedCabinName: action.payload.name,
        selectedCabinData: action.payload,
      };

    default:
      throw new Error(`Can't perform the requested action`);
  }
};

const NewBookingProvider = ({ children }) => {
  const [{ numOfGuest, selectedCabinName, selectedCabinData }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <NewBookingContext.Provider
      value={{ numOfGuest, selectedCabinName, selectedCabinData, dispatch }}
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
