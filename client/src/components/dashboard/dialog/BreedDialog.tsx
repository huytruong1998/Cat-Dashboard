import { Box, Modal, Grid, TextField, Button } from "@mui/material";
import defaultLogo from "assets/default-loading-image.png";

interface BreedDialogProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxWidth: 600,
  maxHeight: 1000,
  pt: 2,
  px: 4,
  pb: 3,
};

const BreedDialog: React.FC<BreedDialogProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={defaultLogo}
              alt=""
            />
          </Grid>
          <Grid container item xs={6} spacing={0.1}>
            <TextField fullWidth label="Name" variant="outlined" />
            <TextField fullWidth label="Origin" variant="outlined" />
            <TextField fullWidth label="Image Url" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BreedDialog;
