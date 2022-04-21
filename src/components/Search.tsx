import "./Search.css";

const Search = ({ children, onChange, searchText }: any) => {
  return (
    <div>
      <label htmlFor="searchBox">{children} </label>
      <input
        value={searchText}
        id="searchBox"
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
