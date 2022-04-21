const Item = ({ title, url, author, num_comments }: any) => {
  return (
    <tr>
      <td className="itemTitle">{title}</td>
      <td className="itemUrl">{url}</td>
      <td>{author}</td>
      <td>{num_comments}</td>
    </tr>
  );
};

export default Item;
