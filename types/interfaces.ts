interface HeaderProps {
  requestAccountView: Function,
};

interface AccountViewProps {
  returnToHomePage: Function,
}

interface FeedSortProps {
  currentSort: string,
  setSort: Function,
}

interface PostProps {
  currentSort: string,
};

interface Post {
  author: string,
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

interface apiResponsePostState {
  message: string,
  posts?: Post[] | null,
};

interface ViewStateProps {
  current: string,
  post?: Post,
};

interface PostViewProps {
  post: Post,
  returnToPosts: Function,
};

interface PostsViewProps {
  changeView: Function,
  posts: Post[],
};

export {
  type HeaderProps,
  type AccountViewProps,
  type FeedSortProps,
  type Post,
  type PostProps,
  type apiResponsePostState,
  type ViewStateProps,
  type PostViewProps,
  type PostsViewProps,
}