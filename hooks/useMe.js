import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      totalFollowers
      totalFollowing
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (!loading) {
      if (!data) {
        logUserOut();
      }
    }
  });

  return { data };
};

export default useMe;
