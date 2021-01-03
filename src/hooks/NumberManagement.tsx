import React, { createContext, useContext, useState } from "react";
import { GameDataContext } from "./GameData";

export type Stock = number[];

type ContextType = {
  getNumber: () => void;
  currentNumber: number;
  stock: Stock;
  getInitialNum: GetInitialNum;
};

const initialStock: Stock = [
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  10,
  10,
  10,
  10,
];

const initialContext: ContextType = {
  getNumber: () => {},
  currentNumber: 0,
  stock: initialStock,
};

export const NumberManagementContext = createContext<ContextType>(
  initialContext
);

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

type GetNumber = (stock: Stock) => { nextNumber: number; nextStock: Stock };
type DeleteNumbers = (numbers: number[]) => void;
type GetInitialNum = () => Promise<{ numbersA: number[]; numbersB: number[] }>;

export const getNumber: GetNumber = (stock) => {
  const shuffleData = shuffle(stock);
  const nextNumber = shuffleData[0];
  const nextStock = shuffleData.filter((v, index) => index !== 0);

  return {
    nextNumber,
    nextStock,
  };
};

export const NumberManagementProvider: React.FC = ({ children }) => {
  const { setNumber } = useContext(GameDataContext);
  const [stock, setStock] = useState(initialStock);
  const [currentNumber, setCurrentNumber] = useState(0);

  const deleteNumbers: DeleteNumbers = (numbers) => {
    const keys = numbers.map((v) => stock.find((vv) => vv === v));
    const newStock = stock.filter((v, index) => keys.indexOf(index));
    setStock(newStock);
  };

  const getInitialNum: GetInitialNum = async () => {
    const { nextNumber: numA1, nextStock: nextStock1 } = await getNumber(stock);
    const { nextNumber: numA2, nextStock: nextStock2 } = await getNumber(
      nextStock1
    );
    const { nextNumber: numB1, nextStock: nextStock3 } = await getNumber(
      nextStock2
    );
    const { nextNumber: numB2, nextStock } = await getNumber(nextStock3);

    setStock(nextStock);
    return { numbersA: [numA1, numA2], numbersB: [numB1, numB2] };
  };

  return (
    <NumberManagementContext.Provider
      value={{
        getNumber: () => {
          const { nextNumber, nextStock } = getNumber(stock);
          setStock(nextStock);
          setCurrentNumber(nextNumber);
          setNumber(nextNumber);
        },
        currentNumber,
        stock,
        getInitialNum,
      }}
    >
      {children}
    </NumberManagementContext.Provider>
  );
};
