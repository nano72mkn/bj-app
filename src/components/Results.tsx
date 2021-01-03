import React, { useContext } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { UserResult } from "./UserResult";

const Wrap = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
`;

export const Results: React.FC = () => {
  return (
    <Wrap>
      <UserResult id={"A"} />
      <UserResult id={"B"} />
    </Wrap>
  );
};
