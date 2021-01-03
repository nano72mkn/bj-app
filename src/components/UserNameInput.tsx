import React, { useContext } from "react";
import { TextInput } from "react-native";
import styled from "styled-components";
import { GameDataContext, userId } from "../hooks/GameData";
import { RouteContext } from "../Router";

interface Props {
  id: userId;
}

const StyledInput = styled(TextInput)`
  width: 80%;
  margin: 8px 0;
  padding: 16px;
  border: solid 2px #ccc;
  border-radius: 3px;
`;

export const UserNameInput: React.FC<Props> = ({ id }) => {
  const { userName } = useContext(GameDataContext);
  const [name, setName] = userName;
  return (
    <StyledInput
      maxLength={5}
      placeholder={`ユーザー${id}の名前を入力してください`}
      value={name[id]}
      onChangeText={(v: string) => setName({ ...name, [id]: v })}
    />
  );
};
