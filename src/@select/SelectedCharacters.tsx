import React from "react";
import { useSelector, useDispatch } from "react-redux";

//Icon
import { CloseIcon } from "../assets/Icon";
//Interface
import { CharacterInterace } from "../interfaces/";
//Slice
import { isSelectedCharacter } from "../redux/characterSlice";

//Selected item
const SelectedItem: React.FC<{
  selectedCharacter: CharacterInterace;
  isActiveKey: boolean;
}> = ({ selectedCharacter, isActiveKey }) => {
  //Dispatch
  const dispatch = useDispatch();
  return (
    <div className="multi-box">
      {selectedCharacter.name}
      <span
        id={`${selectedCharacter.id}`}
        onClick={() =>
          dispatch(isSelectedCharacter({ item: selectedCharacter }))
        }
        className={`${isActiveKey ? "active-key" : "passive-key"}`}
      >
        <CloseIcon />
      </span>
    </div>
  );
};
const SelectedCharacters: React.FC<{ activeKey: number }> = ({ activeKey }) => {
  //Selector
  const selectedCharacters = useSelector(
    (state: any) => state.character.selectedCharacters
  );

  //Create actieted keys
  const activetedKeys = Array.from(
    { length: selectedCharacters.length },
    (_, i) => (i + 1) * -1
  ).reverse();

  return selectedCharacters.map(
    (selectedCharacter: CharacterInterace, key: number) => (
      <SelectedItem
        key={key}
        selectedCharacter={selectedCharacter}
        isActiveKey={activetedKeys[key] === activeKey}
      />
    )
  );
};

export default SelectedCharacters;
