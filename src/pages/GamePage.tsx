import React, { useContext, useEffect } from "react";
import { Alert, Button } from "react-native";
import { Layout } from "../components/Layout";
import { RandomCard } from "../components/RandomCard";
import { Results } from "../components/Results";
import { UserName } from "../components/UserName";
import { GameDataContext } from "../hooks/GameData";
import { NumberManagementContext } from "../hooks/NumberManagement";

type SetInitNumber = () => void;

export const GamePage: React.FC = () => {
  const { getNumber, getInitialNum } = useContext(NumberManagementContext);
  const { setResult, changeTurn } = useContext(GameDataContext);

  const setInitNumber: SetInitNumber = async () => {
    const { numbersA, numbersB } = await getInitialNum();

    const totalA = numbersA.reduce((sum, current) => sum + current);
    const totalB = numbersB.reduce((sum, current) => sum + current);

    setResult({
      A: {
        total: totalA,
        numbers: numbersA,
        isBurst: false,
        isEnd: false,
      },
      B: {
        total: totalB,
        numbers: numbersB,
        isBurst: false,
        isEnd: false,
      },
    });
  };

  const startAlert = () =>
    Alert.alert("ゲームを始めます", "", [
      {
        text: "次へ",
        onPress: () => {
          setInitNumber();
        },
      },
    ]);

  useEffect(() => {
    startAlert();
  }, []);

  return (
    <Layout>
      <UserName />
      <Results />
      <RandomCard />
      <Button title={"引く"} onPress={getNumber} />
      <Button title={"パス"} onPress={changeTurn} />
    </Layout>
  );
};
