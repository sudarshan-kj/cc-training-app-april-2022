const listOfItems = [
  {
    title: "Learn React",
    url: "https://eprint.iacr.org/2021/1022",
    createdAt: "2011-12-12",
    num_comments: 12,
    objectId: 1,
  },
  {
    title: "Learn TypeScript",
    url: "https://eprint.iacr.org/2021/1022",
    createdAt: "2012-12-12",
    num_comments: 1,
    objectId: 2,
  },
];

const List = () => {
  return (
    <div>
      <ul>
        <li>{listOfItems[0].title}</li>
        <li>{listOfItems[0].url}</li>
      </ul>
    </div>
  );
};

export default List;
