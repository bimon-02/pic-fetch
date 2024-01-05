import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { toast, Toaster   } from "sonner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ... (other imports)

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (newCategory: string) => void;
}

export default function BasicModal({ open, onClose, onAddCategory }: BasicModalProps) {
  const [newCategory, setNewCategory] = React.useState(""); 
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [allCategories, setAllCategories] = React.useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory && !allCategories.includes(newCategory)) {
      onAddCategory(newCategory);
      onClose(); // Close the modal after adding the category
    } else {
      // Handle validation or display an error message if needed
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New Category
        </Typography>
        <TextField
          id="new-category-input"
          label="New Category"
          value={newCategory}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
    </Modal>
  );
}
