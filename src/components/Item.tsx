import { useContext } from "react";
import { StoryType } from "../types";
import { AppContext } from "../App";

type ItemProps = {
  item: StoryType;
};

const Item = ({
  item: { title, url, author, num_comments, objectID },
}: ItemProps) => {
  const ctx = useContext(AppContext);

  return (
    <tr>
      <td className="itemTitle">{title}</td>
      <td className="itemUrl">{url}</td>
      <td>{author}</td>
      <td>{num_comments}</td>
      <td className="deleteButton" onClick={() => ctx?.onClickDelete(objectID)}>
        Delete
      </td>
    </tr>
  );
};

export default Item;
