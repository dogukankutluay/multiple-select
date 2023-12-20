import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// Style
import "../styles/select.css";
// Components
import SelectedCharacters from "./SelectedCharacters";
import Modal from "./Modal";
//Interface
import { CharacterInterace } from "../interfaces";
//Services
import { CharacterService } from "../services";
//Slice
import { isSelectedCharacter } from "../redux/characterSlice";

const Select = () => {
  const [inputValue, setInputValue] = useState("");
  const [characters, setCharacters] = useState<CharacterInterace[]>([]);
  const [loading, setLoading] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [isStartedScroll, setIsStarterScroll] = useState(false);
  const [error, setError] = useState<any>(null);
  const [activeKey, setActiveKey] = useState<number>(0);

  //Dispatch
  const dispatch = useDispatch();

  //Selector
  const selectedCharacters = useSelector(
    (state: any) => state.character.selectedCharacters
  );

  //Ref
  const inputElement = useRef<HTMLInputElement | null>(null);

  // Onchange input
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenedModal(true);
    setError(null);
    setInputValue(e.target.value);

    if (e.target.value.length === 0) {
      setCharacters([]);
      return;
    }

    setLoading(true);

    try {
      const response = await CharacterService.get(inputValue);
      setCharacters(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Set input width
  const setInputWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputElement.current) {
      inputElement.current.style.width = e.target.value.length + "ch";
    }
  };

  // On click container
  const focusContainer = () => {
    if (inputElement.current) {
      inputElement.current.focus();
      activeKey < 0 && setActiveKey(0);
      setIsStarterScroll(false);
    }
  };

  // On keydown
  const onKeyDown = (event: React.KeyboardEvent) => {
    // To modal keyboard navigation
    if (event.key === "ArrowDown" || event.key === "Tab") {
      const list: any = document.getElementsByClassName("modal-item");
      list[0].focus();
      setIsStarterScroll(true);
    }
    //Sign control
    const signControl = !inputElement.current || inputValue.length;
    if (signControl) return;

    //Can t go left
    const canItGoLeft = () => {
      let result = true;
      if (activeKey * -1 == selectedCharacters.length) result = false;
      return result;
    };
    //Can t go right
    const canItGoRight = () => {
      let result = true;
      if (activeKey === 0) result = false;
      return result;
    };

    // Case for events
    switch (event.key) {
      case "ArrowLeft":
        //Query for go
        if (!canItGoLeft()) return;

        setActiveKey(activeKey - 1);
        break;
      case "ArrowRight":
        //Query for go
        if (!canItGoRight()) return;

        setActiveKey(activeKey + 1);
        break;
      case "Delete":
        // Get active element and remove in selected array
        const element = document.querySelector(".active-key") as HTMLElement;
        if (!element) return;

        const characterItem = selectedCharacters.find(
          (item: CharacterInterace) => item.id === Number(element.id)
        );
        dispatch(isSelectedCharacter({ item: characterItem }));
        setActiveKey(0);
        break;
      default:
        break;
    }
  };

  // For input caret color
  useEffect(() => {
    if (!inputElement.current) return;

    inputElement.current.style.caretColor =
      activeKey < 0 ? "transparent" : "black";
  }, [activeKey]);
  return (
    <div className="select-wp">
      <div onClick={focusContainer} className="select-container">
        <SelectedCharacters activeKey={activeKey} />
        <div className="input-container">
          <input
            id="select-input"
            type="text"
            ref={inputElement}
            value={inputValue}
            onInput={setInputWidth}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {!(inputValue.length > 0) && !selectedCharacters.length && (
            <div className="placeholder">Seçiniz</div>
          )}
        </div>
      </div>
      <Modal
        focusContainer={focusContainer}
        searchQuery={inputValue}
        show={openedModal}
        loading={loading}
        characters={characters}
        error={error}
        isStartedScroll={isStartedScroll}
      />
    </div>
  );
};
export default Select;
