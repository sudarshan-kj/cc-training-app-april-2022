import "./List.css";

const List = ({ listOfItems }: any) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Author</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {listOfItems.map((item: any) => (
            <tr key={item.objectID}>
              <td className="itemTitle">{item.title}</td>
              <td className="itemUrl">{item.url}</td>
              <td>{item.author}</td>
              <td>{item.num_comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
