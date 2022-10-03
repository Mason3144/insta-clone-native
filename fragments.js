import { gql } from "@apollo/client";

// must be same name with backend result as "Photo" and subdirectories
export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    payload
    isMine
    createdAt
    user {
      username
      avatar
    }
  }
`;
