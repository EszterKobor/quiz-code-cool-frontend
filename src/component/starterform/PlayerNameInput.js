import React, { useContext } from "react";
import { StarterFormContext } from "../../context/StarterFormContext";

import { TextInput } from "../../style/MyStyle";

export default function PlayerNameInput() {
  const [names, setNames] = useContext(StarterFormContext).nameInputs;
  const playerNumber = useContext(StarterFormContext).playerNumber[0];

  const handlePlayerName = e => {
    let currentNames = [...names];
    currentNames[e.target.name] = e.target.value;
    setNames(currentNames);
  };

  const createPlayerInput = n => {
    let inputs = [];
    for (let i = 0; i < n; i++) {
      inputs.push(
        <div key={i}>
          <label htmlFor={i}>Player {i + 1} name: </label>
          <TextInput
            name={i}
            id={i}
            type="text"
            placeholder={`Player ${i + 1}`}
            required
            onKeyUp={handlePlayerName}
          ></TextInput>
        </div>
      );
    }
    return inputs;
  };

  return <div>{createPlayerInput(playerNumber)}</div>;
}
