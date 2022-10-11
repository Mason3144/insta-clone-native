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
    updatedAt
    user {
      username
      avatar
      id
    }
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    email
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    commentNumber
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
    ...PhotoFragment
    comments {
      ...CommentFragment
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`;
