interface BlogItem {
  id: string;
  title: string;
  content: string;
  author: Author;
  tags: TagItem[];
  createdAt: string;
}

interface Author {
  id: string;
  name: string;
}

interface TagItem {
  id: string;
  name: string;
}
