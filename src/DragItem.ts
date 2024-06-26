export interface ColumnDragItem {
  id: string;
  text: string;
  type: "COLUMN";
}

export interface CardDragItem {
  id: string;
  columnId: string;
  text: string;
  type: "CARD";
}

export type DragItem = ColumnDragItem | CardDragItem;
