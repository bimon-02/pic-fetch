// components/AddCategoryModal.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

type AddCategoryModalProps = {
  showNewCategoryModal: boolean;
  handleCloseModal: () => void;
  setNewCategoryName: React.Dispatch<React.SetStateAction<string>>;
  handleAddCategory: () => void;
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  showNewCategoryModal,
  handleCloseModal,
  setNewCategoryName,
  handleAddCategory,
}) => {
  return (
    <Dialog open={showNewCategoryModal} onClose={handleCloseModal}>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={handleAddCategory}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;
