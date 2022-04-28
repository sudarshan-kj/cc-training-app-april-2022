import { title, storiesReducer } from "./App";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Item from "./components/Item";
import App, { AppContext } from "./App";
import { BrowserRouter } from "react-router-dom";
import InputWithLabel from "./components/InputWithLabel";
import axios from "axios";

describe("unit testing basics", () => {
  test("assert if title is React", () => {
    expect(true).toBe(true);
  });

  test("assert if title is React", () => {
    expect(title).toBe("React Training");
  });
});

const storyOne = {
  title: "Learn React",
  url: "https://eprint.iacr.org/2021/1022",
  created_at: "2011-12-12",
  author: "grey-area",
  points: 1107,
  num_comments: 12,
  objectID: 1,
};

const storyTwo = {
  created_at: "2017-02-19T21:16:33.000Z",
  title: "Reflecting on one very, very strange year at Uber",
  url: "https://www.susanjfowler.com/blog/2017/2/19/reflecting-on-one-very-strange-year-at-uber",
  author: "grey-area",
  points: 4107,
  num_comments: 530,
  objectID: 3,
};

const storyThree = {
  created_at: "2021-04-05T14:04:22.000Z",
  title: "Google’s copying of the Java SE API was fair use [pdf]",
  url: "https://www.supremecourt.gov/opinions/20pdf/18-956_d18f.pdf",
  author: "pdoconnell",
  points: 4103,
  num_comments: 930,
  objectID: 4,
};

const stories = [storyOne, storyTwo];

//unit testing of functions

describe("testing the stories reducer", () => {
  test("test remove story from reducer", () => {
    const currentState = { data: stories, isLoading: false, isError: false };
    const action = { type: "REMOVE_STORY", payload: { id: 3 } };
    const newState = storiesReducer(currentState, action);
    const expectedState = {
      data: [storyOne],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  test("test remove story from reducer", () => {
    const currentState = { data: stories, isLoading: false, isError: false };
    const action = {
      type: "SET_STORIES",
      payload: { data: [storyOne, storyThree] },
    };
    const newState = storiesReducer(currentState, action);
    const expectedState = {
      data: [storyOne, storyThree],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

//unit testing of components

describe("test Item component", () => {
  test("render item component", () => {
    render(<Item item={storyOne} />);
  });

  test("render item component", () => {
    const mockDeleteFunction = jest.fn();
    const wrapper = ({ children }) => (
      <AppContext.Provider value={{ onClickDelete: mockDeleteFunction }}>
        {children}
      </AppContext.Provider>
    );

    render(<Item item={storyOne} onClickDelete={mockDeleteFunction} />, {
      wrapper,
    });
    screen.debug();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockDeleteFunction).toHaveBeenCalledTimes(1);
  });
});

describe("test Input with label component", () => {
  test("render Input with label component", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    render(<InputWithLabel {...inputWithLabelProps} />);
    screen.debug();
  });

  test("snapshot testing", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    const { container } = render(<InputWithLabel {...inputWithLabelProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check if on change is called", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    render(<InputWithLabel {...inputWithLabelProps} />);
    const inputElement = screen.getByDisplayValue("React");
    screen.debug();
    fireEvent.change(inputElement, { target: { value: "Redux" } });
    expect(inputWithLabelProps.onChange).toHaveBeenCalledTimes(1);
  });
});

//integration testing
jest.mock("axios");

describe("render the app component", () => {
  test("check if render works", async () => {
    const resolvedPromise = Promise.resolve({ data: { hits: stories } });
    axios.get.mockImplementationOnce(() => resolvedPromise);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.queryByText("Loading")).toBeInTheDocument();
    await act(() => resolvedPromise);
    expect(screen.queryByText("Loading")).toBeNull();
    screen.debug();
  });
});
