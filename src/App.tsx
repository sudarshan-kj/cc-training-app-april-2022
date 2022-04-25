import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import logo from "./assets/logo.png";
import usePersistence from "./hooks/usePersistence";
import React, { useEffect, useState, useReducer, useCallback } from "react";
import axios from "axios";

const title: string = "React Training";

function storiesReducer(state: any, action: any) {
  switch (action.type) {
    case "SET_STORIES":
      return { data: action.payload.data, isError: false, isLoading: false };
    case "INIT_FETCH":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    case "REMOVE_STORY":
      const filteredState = state.data.filter(
        (story: any) => story.objectID !== action.payload.id
      );
      return { data: filteredState, isError: false, isLoading: false };
    default:
      return state;
  }
}

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

function App(): JSX.Element {
  const [searchText, setSearchText] = usePersistence("searchTerm", "React");
  const [url, setUrl] = useState(API_ENDPOINT + searchText);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "INIT_FETCH" });
    try {
      const response = await axios.get(url);
      dispatchStories({
        type: "SET_STORIES",
        payload: { data: response.data.hits },
      });
    } catch {
      dispatchStories({ type: "FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleDeleteClick(objectId: number) {
    dispatchStories({ type: "REMOVE_STORY", payload: { id: objectId } });
  }

  function handleSubmitClick(e: any) {
    e.preventDefault();
    setUrl(API_ENDPOINT + searchText);
  }

  if (stories.isError) {
    return (
      <h1 style={{ marginTop: "10rem", color: " red" }}>
        Something went wrong
      </h1>
    );
  }

  return (
    <div>
      <nav>
        <div className="heading">
          <h1>{title}</h1>
          <img src={logo} />
        </div>
        <InputWithLabel
          searchText={searchText}
          onChange={handleChange}
          id="searchBox"
          onSearchSubmit={handleSubmitClick}
        >
          Search
        </InputWithLabel>
      </nav>
      {stories.isLoading ? (
        <h1 style={{ marginTop: "10rem" }}>Loading</h1>
      ) : (
        <List listOfItems={stories.data} onClickDelete={handleDeleteClick} />
      )}
    </div>
  );
}

export default App;
