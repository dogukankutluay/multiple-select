import React, { useEffect, useState, useRef, useCallback } from "react";

//Style
import "../styles/select.css";

//Icon
import { LoadingIcon } from "../assets/Icon";

//Interface
import { PropsModalItem, PropsModal, CharacterInterace } from "../interfaces";

//Utils
import { highlightName } from "../utils/";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Slice
import { isSelectedCharacter } from "../redux/characterSlice";
const ModalItem: React.FC<PropsModalItem> = ({
  item,
  searchQuery,
  focus,
  isStartedScroll,
}) => {
  const [isSelected, setIsSelected] = useState(item.isSelected);
  const ref = useRef<any>();
  useEffect(() => {
    if (focus && isStartedScroll) {
      ref.current.focus();
    }
  }, [focus]);
  //Dispatch
  const dispatch = useDispatch();

  //Handle item click
  const handleItemClick = () => {
    setIsSelected(!isSelected);
    dispatch(isSelectedCharacter({ item }));
  };

  //Check is selected
  useEffect(() => {
    setIsSelected(item.isSelected);
  }, [item.isSelected]);

  return (
    <li
      tabIndex={focus ? 0 : -1}
      ref={ref}
      className="modal-item"
      onClick={handleItemClick}
    >
      <input type="checkbox" onChange={handleItemClick} checked={isSelected} />
      <img src={item.image} alt={`${item.name} Photo`} />
      <div className="modal-names">
        <p>{highlightName(item.name, searchQuery)}</p>
        <span>{item.episode.length} Episodes</span>
      </div>
    </li>
  );
};

const Modal: React.FC<PropsModal> = ({
  characters,
  loading,
  show,
  searchQuery,
  focusContainer,
  error,
  isStartedScroll,
}) => {
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: any) => state.character.selectedCharacters
  );
  const [currentFocus, setCurrentFocus] = useState(0);
  const size = characters.length;

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      event.preventDefault();
      switch (event.key) {
        case "ArrowDown":
          //key down
          setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
          break;
        case "ArrowUp":
          setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
          break;
        case "Enter":
          const characterItem = characters[currentFocus];

          dispatch(isSelectedCharacter({ item: characterItem }));

          console.log(characterItem);
          break;
        default:
          break;
      }
    },
    [size, currentFocus, setCurrentFocus]
  );

  return (
    <React.Fragment>
      {show && (
        <div className="select-modal-container">
          <ul
            onKeyDown={handleKeyDown}
            className="select-modal"
            onClick={focusContainer}
          >
            {loading ? (
              <LoadingIcon />
            ) : error ? (
              <div className="not-found">{error}</div>
            ) : characters.length ? (
              characters?.map((item, key) => (
                <ModalItem
                  isStartedScroll={isStartedScroll}
                  setFocus={setCurrentFocus}
                  focus={currentFocus === key}
                  index={key}
                  key={key}
                  item={{
                    ...item,
                    isSelected: selectedCharacters.some(
                      (selected: CharacterInterace) => selected.id === item.id
                    ),
                  }}
                  searchQuery={searchQuery}
                />
              ))
            ) : (
              <div className="not-found">Karakter bulunamadı.</div>
            )}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
