import React from "react";
import styled from "styled-components";
const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: gray;
  border-radius: 5px;
`;
const FollowBtnText = styled.Text`
  font-weight: 600;
`;

export default FollowBtn = ({ isFollowing }) => {
  return (
    <Button>
      <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
    </Button>
  );
};
