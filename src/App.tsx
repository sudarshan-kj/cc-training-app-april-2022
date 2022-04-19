import "./App.css";
import List from "./components/List";

function App({ firstName, age }: any) {
  return (
    <div>
      <h1>
        Welcome to {firstName} {age} training!
      </h1>
      <List />
    </div>
  );
}

export default App;
