import React, { useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { NumberManagementContext } from "../hooks/NumberManagement";

const Card = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(44, 44, 44, 0.2);
  background-color: #fff;
  border-radius: 20px;
`;

const CardNumber = styled(Text)`
  font-size: 100px;
  font-weight: bold;
`;

export const RandomCard: React.FC = () => {
  const { currentNumber } = useContext(NumberManagementContext);
  return (
    <Card>
      <CardNumber>{currentNumber === 0 ? "?" : currentNumber}</CardNumber>
    </Card>
  );
};
