import { StoryType } from "../types";

type ItemProps = {
  item: StoryType;
  onClickDelete: (e: number) => void;
};

const Item = ({
  item: { title, url, author, num_comments, objectID },
  onClickDelete,
}: ItemProps) => {
  return (
    <tr>
      <td className="itemTitle">{title}</td>
      <td className="itemUrl">{url}</td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td onClick={() => onClickDelete(objectID)}>Delete</td>
    </tr>
  );
};

export default Item;
