import styled from "styled-components";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;

  border-radius: 4px;
  color: white;
  margin-bottom: ${(Props) => (Props.lastOne ? "15" : 8)}px;
`;
