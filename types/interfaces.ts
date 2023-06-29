interface HeaderProps {
  handleUserQueryResults: Function,
}

interface AccountViewProps {
  returnToHomePage: Function,
};

interface FeedProps {
  userQuery: queryResult,
};

interface FeedSortProps {
  currentSort: string,
  setSort: Function,
};

interface PostsProps {
  currentSort: string,
  userQuery: queryResult,
};

interface Post {
  author: string | {
    _id: string,
    firstName: string,
    lastName: string,
  },
  body: string;
  comments: any[];
  favorites: number;
  likes: number;
  tags: string[];
  timestamp: string;
  title: string;
  whoLiked: string[];
  views: number;
  _id: string,
}

interface Comment {
  author: string,
  comment: string,
  likes: number,
  timestamp: string,
  user: string,
  whoLiked: string[],
  _id: string,
};

interface apiResponsePostState {
  message: string,
  posts?: Post[],
};

interface ViewStateProps {
  current: string,
  post?: Post,
};

interface PostViewProps {
  post: Post,
  returnToPosts: Function,
  postReactionChange: Function,
  incrementLocalPostViewAmount: Function,
};

interface PostsViewProps {
  changeView: Function,
  posts: Post[],
  query: boolean,
  stopQuery: Function,
};

interface CommentsProps {
  postId: string,
};

interface CommentsState {
  message: string,
  comments?: Comment[],
};

interface AddCommentProps {
  postId: string,
  refreshCommentList: Function,
};

interface Announcement {
  announcement: string,
  _id: string,
};

interface SidebarState {
  message: string,
  announcements?: Announcement[],
};

enum LikeType {
  LIKE,
  UNLIKE,
};

type queryResult = {
  message: string,
  posts?: Post[],
  renderNeeded: boolean,
}

export type {
  HeaderProps,
  FeedProps,
  AccountViewProps,
  FeedSortProps,
  Post,
  PostsProps,
  apiResponsePostState,
  ViewStateProps,
  PostViewProps,
  PostsViewProps,
  Comment,
  CommentsProps,
  CommentsState,
  AddCommentProps,
  SidebarState,
  queryResult,
}

export {
  LikeType,
};