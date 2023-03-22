interface Result<T> {
  errcode: number;
  message: string;
  data: T;
}

interface User {
  userId: string;
  avatar: string;
  name: string;
  email: string;
  title: string;
}

interface BlogItem {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: TagItem[];
  createdAt: string;
}

interface TagItem {
  id: string;
  name: string;
}

