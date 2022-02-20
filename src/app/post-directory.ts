export interface Post {
  date: string;
  name: string;
  tags: string[];
}

export var POST_DATABASE: Post[] = [
  {
    date: '2022-02-22',
    name: 'Placeholder post',
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    date: '2022-02-22',
    name: 'Placeholder post2',
    tags: ['tag2', 'tag3'],
  },
  {
    date: '2022-02-22',
    name: 'Placeholder post3',
    tags: ['tag1', 'tag4', 'tag5'],
  },
];
