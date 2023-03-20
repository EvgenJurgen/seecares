export interface Item {
  title: any;
  value: any;
}

export interface Props {
  itemsList: Item[] | null;
  selectedItem: Item;
  selectItem: (item: Item) => void;
}
