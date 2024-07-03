import { useRef } from "react";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { addTask, moveList, moveTask, setDraggedItem } from "./state/Actions";
import { useAppState } from "./state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "./styles";
import { useItemDrag } from "./utils/useItemDrag";
import { throttle } from "throttle-debounce-ts";
import { useDrop } from "react-dnd";
import { isHidden } from "./utils/isHidden";

export interface ColumnProps {
  columnTitle: string;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ columnTitle, id, isPreview }: ColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const { drag } = useItemDrag({ type: "COLUMN", id, text: columnTitle });
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{columnTitle}</ColumnTitle>
      {tasks.map((task) => (
        <Card
          cardText={task.text}
          key={task.id}
          id={task.id}
          columnId={id}
          isPreview={isPreview}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add Another Item"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
