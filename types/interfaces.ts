interface AccountViewProps {
  returnToHomePage: Function,
};

interface FeedSortProps {
  currentSort: string,
  setSort: Function,
};

interface PostProps {
  currentSort: string,
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
};

interface PostsViewProps {
  changeView: Function,
  posts: Post[],
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
};

interface SidebarState {
  message: string,
  announcements?: Announcement[],
};

enum LikeType {
  LIKE,
  UNLIKE,
};

export type {
  AccountViewProps,
  FeedSortProps,
  Post,
  PostProps,
  apiResponsePostState,
  ViewStateProps,
  PostViewProps,
  PostsViewProps,
  Comment,
  CommentsProps,
  CommentsState,
  AddCommentProps,
  SidebarState,
}

export {
  LikeType,
};