import { useState } from "react";
import { AddItemButton, AddItemButtonProps } from "./styles";
import { NewItemForm } from "./NewitemForm";

export interface AddNewItemProps extends AddItemButtonProps {
  onAdd(text: string): void;
  toggleButtonText: string;
}

export const AddNewItem = ({
  onAdd,
  toggleButtonText,
  dark,
}: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    // render the form component
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
