import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";

const Wrap = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const Layout: React.FC = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};
