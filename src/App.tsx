import "./App.css";
import List from "./components/List";
import InputWithLabel from "./components/InputWithLabel";
import logo from "./assets/logo.png";
import usePersistence from "./hooks/usePersistence";
import React, { useEffect, useState } from "react";
import { StoryType } from "./types";

const title: string = "React Training";

const listOfItems: Array<StoryType> = [
  {
    title: "Learn React",
    url: "https://eprint.iacr.org/2021/1022",
    created_at: "2011-12-12",
    author: "grey-area",
    points: 1107,
    num_comments: 12,
    objectID: 1,
  },
  {
    title: "Learn TypeScript",
    url: "https://eprint.iacr.org/2021/1022",
    created_at: "2012-12-12",
    author: "grey-area",
    points: 6107,
    num_comments: 1,
    objectID: 2,
  },
  {
    created_at: "2017-02-19T21:16:33.000Z",
    title: "Reflecting on one very, very strange year at Uber",
    url: "https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber",
    author: "grey-area",
    points: 4107,
    num_comments: 530,
    objectID: 3,
  },
  {
    created_at: "2021-04-05T14:04:22.000Z",
    title: "Google’s copying of the Java SE API was fair use [pdf]",
    url: "https://www.supremecourt.gov/opinions/20pdf/18-956_d18f.pdf",
    author: "pdoconnell",
    points: 4103,
    num_comments: 930,
    objectID: 4,
  },
];

function getAsyncData() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject({ data: listOfItems }), 3000)
  );
}

function App(): JSX.Element {
  const [searchText, setSearchText] = usePersistence("searchTerm", "React");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncData()
      .finally(() => setIsLoading(false))
      .then((value: any) => setStories(value.data))
      .catch((e) => setIsError(true));
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleDeleteClick(objectId: number) {
    const newListOfItems = stories.filter(
      (story: StoryType) => story.objectID !== objectId
    );
    setStories(newListOfItems);
  }

  const filteredList = stories.filter((item: StoryType) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isError) {
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
        >
          Search
        </InputWithLabel>
      </nav>
      {isLoading ? (
        <h1 style={{ marginTop: "10rem" }}>Loading</h1>
      ) : (
        <List listOfItems={filteredList} onClickDelete={handleDeleteClick} />
      )}
    </div>
  );
}

export default App;
