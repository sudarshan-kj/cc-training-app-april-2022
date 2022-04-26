export type StoryType = {
  title: string;
  url: string;
  created_at: string;
  author: string;
  points: number;
  num_comments: number;
  objectID: number;
};

export type StateType = {
  data: Array<StoryType>;
  isLoading: boolean;
  isError: boolean;
};

interface ISetStories {
  type: "SET_STORIES";
  payload: { data: Array<StoryType> };
}

interface IInitFetch {
  type: "INIT_FETCH";
}

interface IFetchFailure {
  type: "FETCH_FAILURE";
}

interface IRemoveStory {
  type: "REMOVE_STORY";
  payload: { id: number };
}

export type ActionType =
  | ISetStories
  | IInitFetch
  | IFetchFailure
  | IRemoveStory;
