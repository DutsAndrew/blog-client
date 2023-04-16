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

export {
  type HeaderProps,
  type AccountViewProps,
  type FeedSortProps,
  type Post,
  type PostProps,
  type apiResponsePostState,
}