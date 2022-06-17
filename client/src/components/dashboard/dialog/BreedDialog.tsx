import { Box, Modal, Grid, TextField, Button } from "@mui/material";
import defaultLogo from "assets/default-loading-image.png";
import "./BreedDialog.scss";

interface BreedDialogProps {
  open: boolean;
  handleClose: () => void;
  breedId?: string;
}

const BreedDialog: React.FC<BreedDialogProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="container">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img style={{ width: "100%" }} src={defaultLogo} alt="" />
          </Grid>
          <Grid style={{ gridRowGap: 10 }} container item xs={6}>
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
