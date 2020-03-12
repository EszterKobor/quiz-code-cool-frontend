import React, { useState, createContext } from "react";

export const TypeContext = createContext();

export const TypeProvider = props => {
  const ANY_TYPE = "Any Type";
  const ALL_TYPES = ["MULTIPLE", "BOOLEAN"];
  const [selectedType, setSelectedType] = useState("");

  const typesMap = {
    "Any Type": "Any Type",
    MULTIPLE: "Multiple Choice",
    BOOLEAN: "True / False"
  };

  const clearSelectedType = () => {
    setSelectedType("");
  };

  console.log("TypeProvider INITIALIZED");

  return (
    <TypeContext.Provider
      value={{
        clearSelectedType,
        selectedTypeInput: [selectedType, setSelectedType],
        ANY_TYPE,
        ALL_TYPES,
        typesMap
      }}
    >
      {props.children}
    </TypeContext.Provider>
  );
};