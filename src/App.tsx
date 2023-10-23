import { useState } from "react";
import "./App.css";
import { writeCompanyData, getCompanyData } from "./configs/firebase.ts";

function App() {
  const [count, setCount] = useState(0);

  writeCompanyData(0, "Apple", "https://www.apple.com/careers/uk/");

  const data = getCompanyData();

  console.log(data);

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      {/*<div>{{ data }}</div>*/}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
