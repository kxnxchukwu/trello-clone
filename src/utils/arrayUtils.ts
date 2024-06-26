import { List, Task } from "../state/AppStateContext";

export const findItemIndexById = (items: List[] | Task[], id: string) => {
  return items.findIndex((item) => item.id === id);
};

export const removeItemAtIndex = (array: List[] | Task[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertItemAtIndex = (
  array: List[] | Task[],
  item: List | Task,
  index: number
): List[] | Task[] => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const moveItem = (array: List[] | Task[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
