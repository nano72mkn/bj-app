import React, { useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { GameDataContext, userId } from "../hooks/GameData";

interface Props {
  id: userId;
}

const Wrap = styled(View)`
  width: 50%;
`;

const UserName = styled(Text)<{ isBurst: boolean }>`
  font-size: 20px;
  text-align: center;
  color: ${({ isBurst }) => (isBurst ? "red" : "#000")};
`;

const Total = styled(Text)<{ isBurst: boolean }>`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: ${({ isBurst }) => (isBurst ? "red" : "#000")};
`;

export const UserResult: React.FC<Props> = ({ id }) => {
  const { userName, result } = useContext(GameDataContext);
  const [name] = userName;
  const isBurst = result[id].isBurst;
  return (
    <Wrap>
      <UserName isBurst={isBurst}>{name[id]}</UserName>
      <Total isBurst={isBurst}>{result[id].total}</Total>
    </Wrap>
  );
};
