import React, { useContext } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { GameDataContext } from "../hooks/GameData";

const Wrap = styled(Text)`
  font-size: 30px;
  margin-bottom: 20px;
`;
const Name = styled(Text)`
  font-weight: bold;
`;

export const UserName: React.FC = () => {
  const { userName, turn } = useContext(GameDataContext);
  const [name] = userName;
  const [turnId] = turn;
  return (
    <Wrap>
      <Name>{name[turnId]}</Name>さんのターン
    </Wrap>
  );
};
