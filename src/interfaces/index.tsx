export interface CharacterInterace {
  id: number;
  name: string;
  image: string;
  episode: string[];
  isSelected?: boolean;
}

export interface PropsModal {
  characters: CharacterInterace[];
  loading: boolean;
  show: boolean;
  searchQuery: string;
  focusContainer: any;
  error: string;
  isStartedScroll: boolean;
}
export interface PropsModalItem {
  item: CharacterInterace;
  searchQuery: string;
  index: number;
  setFocus: any;
  focus: any;
  isStartedScroll: boolean;
}
