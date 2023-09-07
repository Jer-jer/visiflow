import React from "react";
import "./App.scss";

//Components
import Button from "./components/button";
import Input from "./components/inputs/input";

function App() {
  return (
    // Component  List
    <div>
      <div className="flex justify-center align-middle items-center gap-4 m-8">
        <div>
          <Button
            color="btn-primary"
            customStylings="rounded-3xl w-36 text-base normal-case font-medium"
            label="Button"
          />
        </div>
        <div>
          <Input
            inputType="text"
            leftLabel="No. of Visitors"
            topLeftLabel="&nbsp;"
            globalCustomStylings="w-96"
            inputCustomStylings="bg-base-100 border-0 border-b-2 rounded-none border-neutral w-full max-w-xs focus:outline-none focus:ring-0 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
