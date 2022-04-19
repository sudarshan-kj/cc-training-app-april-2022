import "./Search.css";

const Search = ({ children, onChange }: any) => {
  return (
    <div>
      <label htmlFor="searchBox">{children} </label>
      <input id="searchBox" type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
