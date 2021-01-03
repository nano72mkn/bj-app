import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { RouteContext } from "../Router";

export type userId = "A" | "B";

type typeSet<T> = { [key in userId]: T };

type GameResult = {
  total: number;
  numbers: number[];
  isBurst: boolean;
  isEnd: boolean;
};

type GameData = {
  userName: typeSet<string>;
  gameResult: typeSet<GameResult>;
  turn: userId;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type StateAction<T> = [T, SetState<T>];
type SetNumber = (num: number) => void;
type SetResult = (data: typeSet<GameResult>) => void;

type ContextType = {
  userName: StateAction<GameData["userName"]>;
  result: typeSet<GameResult>;
  setResult: SetResult;
  turn: StateAction<userId>;
  setNumber: SetNumber;
  changeTurn: () => void;
};

export const GameDataContext = createContext<ContextType>({} as ContextType);

const initialState: GameData = {
  turn: "A",
  userName: {
    A: "",
    B: "",
  },
  gameResult: {
    A: {
      total: 0,
      numbers: [],
      isBurst: false,
      isEnd: false,
    },
    B: {
      total: 0,
      numbers: [],
      isBurst: false,
      isEnd: false,
    },
  },
};

export const GameDataProvider: React.FC = ({ children }) => {
  const { setRoute } = useContext(RouteContext);
  const userName = useState<GameData["userName"]>(initialState.userName);
  const [result, setGameResult] = useState<GameData["gameResult"]>(
    initialState.gameResult
  );
  const turn = useState<GameData["turn"]>(initialState.turn);
  const [name] = userName;

  const setNumber: SetNumber = (num) => {
    const [turnId] = turn;
    const numbers = result[turnId].numbers;
    numbers.push(num);

    const total = numbers.reduce((sum, current) => sum + current);

    const isBurst = total > 21;
    if (isBurst) changeTurn();

    setGameResult({
      ...result,
      [turnId]: {
        ...result[turnId],
        total,
        numbers,
        isBurst,
        isEnd: isBurst,
      },
    });
  };

  const winnerCheck = (): string => {
    const resA = result["A"];
    const resB = result["B"];

    // バーストチェック
    if (resA.isBurst && resB.isBurst) return "二人ともバースト！引き分け";

    if (
      !resA.isBurst &&
      ((!resA.isBurst && resB.isBurst) ||
        (resA.total === 21 && resB.total !== 21) ||
        resA.total > resB.total)
    )
      return `${name["A"]}さんの勝ち`;

    if (
      !resA.isBurst &&
      ((resA.isBurst && !resB.isBurst) ||
        (resA.total !== 21 && resB.total === 21) ||
        resA.total < resB.total)
    )
      return `${name["B"]}さんの勝ち`;

    return "引き分け";
  };

  const gameSet = () => {
    const text = winnerCheck();

    Alert.alert("GAME SET!", text, [
      {
        text: "OK",
        onPress: () => {
          setRoute("TopPage");
        },
      },
    ]);
  };

  const changeTurn = () => {
    const [turnId, setId] = turn;
    const nextId = turnId === "A" ? "B" : "A";

    if (result[nextId].isEnd) return gameSet();

    setGameResult({
      ...result,
      [turnId]: {
        ...result[turnId],
        isEnd: true,
      },
    });
    setId(nextId);
  };

  const setResult: SetResult = (data) => {
    setGameResult({
      ...result,
      ...data,
    });
  };

  return (
    <GameDataContext.Provider
      value={{ userName, result, setResult, turn, setNumber, changeTurn }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
