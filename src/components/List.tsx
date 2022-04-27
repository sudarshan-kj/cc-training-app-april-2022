import React, { useEffect } from "react";
import "./List.css";
import Item from "./Item";
import { StoryType } from "../types";
import { useState } from "react";

type ListProps = {
  listOfItems: Array<StoryType>;
};

const SORT_COLUMNS = {
  title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
  url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
  author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
};

const List = ({ listOfItems }: ListProps) => {
  const [sortedList, setSortedList] = useState(listOfItems);

  function handleSort(column: "title" | "url" | "author") {
    const sortedListOfItems = [...sortedList.sort(SORT_COLUMNS[column])];
    setSortedList(sortedListOfItems);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("url")}>URL</th>
            <th onClick={() => handleSort("author")}>Author</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((item) => (
            <Item key={item.objectID} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(List);
