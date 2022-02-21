export interface Post {
  id: string;
  date: string;
  name: string;
  tags: string[];
}

export var POST_DATABASE: Post[] = [
  {
    id: "stylingtest",
    date: '2022-02-22',
    name: 'Styling Test',
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: "place1",
    date: '2022-02-20',
    name: 'A placeholder post',
    tags: ['tag2', 'tag3'],
  },
  {
    id: "place2",
    date: '2022-02-10',
    name: 'Another placeholder post',
    tags: ['tag1', 'tag4', 'tag5'],
  },
];
