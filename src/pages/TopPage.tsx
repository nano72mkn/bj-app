import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from "styled-components";
import { UserNameInput } from "../components/UserNameInput";
import { Layout } from "../components/Layout";
import { GameDataContext } from "../hooks/GameData";
import { RouteContext } from "../Router";

const Title = styled(Text)`
  margin-bottom: 40px;
  font-size: 40px;
  font-weight: bold;
`;

const Input = styled(TextInput)`
  width: 80%;
  margin: 8px 0;
  padding: 16px;
  border: solid 2px #ccc;
  border-radius: 3px;
`;

export const TopPage: React.FC = () => {
  const { userName } = useContext(GameDataContext);
  const { setRoute } = useContext(RouteContext);
  const [name] = userName;
  return (
    <Layout>
      <Title>BJ</Title>
      <UserNameInput id={"A"} />
      <UserNameInput id={"B"} />
      <Button
        title="ユーザー名を決定"
        onPress={() => {
          setRoute("GamePage");
        }}
        disabled={Boolean(!name["A"] || !name["B"])}
      />
    </Layout>
  );
};
