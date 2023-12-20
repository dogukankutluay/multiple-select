import { createSlice } from "@reduxjs/toolkit";

// Interface
import { CharacterInterace } from "../interfaces/";

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    selectedCharacters: [] as CharacterInterace[],
  },
  reducers: {
    //If it is a selected character, removes it from the array
    isSelectedCharacter: (state, action) => {
      const { item } = action.payload;
      const findItem = state.selectedCharacters.find((c) => c.id === item.id);
      if (findItem) {
        state.selectedCharacters = state.selectedCharacters.filter(
          (character) => character.id !== findItem.id
        );
      } else {
        state.selectedCharacters.push(item);
      }
    },
  },
});
export const { isSelectedCharacter } = characterSlice.actions;
export default characterSlice.reducer;
