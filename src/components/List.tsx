import React from "react";
import "./List.css";
import Item from "./Item";
import { StoryType } from "../types";
import { useState } from "react";

type ListProps = {
  listOfItems: Array<StoryType>;
};

const SORT_COLUMNS: any = {
  title: (a: StoryType, b: StoryType) => a?.title?.localeCompare(b?.title),
  url: (a: StoryType, b: StoryType) => a?.url?.localeCompare(b?.url),
  author: (a: StoryType, b: StoryType) => a?.author?.localeCompare(b?.author),
  num_comments: (a: StoryType, b: StoryType) =>
    a?.num_comments - b?.num_comments,
};

const CustomSortHeaders = ({ headers, onClick, sortInfo }: any) => {
  return headers.map(([column, displayName]: any) => (
    <CustomSortHeader
      key={column}
      column={column}
      displayName={displayName}
      onClick={onClick}
      sortInfo={sortInfo}
    />
  ));
};

const CustomSortHeader = ({ column, displayName, onClick, sortInfo }: any) => {
  return (
    <th onClick={() => onClick(column)}>
      {displayName}
      {"        "}
      {sortInfo.column === column && (sortInfo.isDesc ? "↓" : "↑")}
    </th>
  );
};

const List = ({ listOfItems }: ListProps) => {
  const [sortInfo, setSortInfo] = useState(() => {
    console.log("Initializing sort info state");
    return { column: "none", isDesc: false };
  });
  const newListOfItems = [...listOfItems];
  newListOfItems.sort(SORT_COLUMNS[sortInfo.column]);
  if (sortInfo.isDesc) {
    newListOfItems.reverse();
  }

  function handleSort(column: "title" | "url" | "author" | "num_comments") {
    setSortInfo((prev) => {
      return { column, isDesc: !prev.isDesc };
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <CustomSortHeaders
              headers={[
                ["title", "Title"],
                ["url", "URL"],
                ["author", "Author"],
                ["num_comments", "Comments"],
              ]}
              onClick={handleSort}
              sortInfo={sortInfo}
            />
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newListOfItems.map((item) => (
            <Item key={item.objectID} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(List);
