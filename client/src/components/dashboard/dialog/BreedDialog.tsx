import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Modal, Grid, TextField, Button } from "@mui/material";
import { ADD_CAT_BREED, EDIT_CAT_BREED } from "apollo/mutations/breed-mutation";
import {
  GET_CAT_BREEDS,
  GET_CAT_BREED_BY_ID,
} from "apollo/queries/breed-query";
import defaultLogo from "assets/default-loading-image.png";
import { Loading } from "components/loading/loading";
import { DashBoardContext } from "context/DashBoardContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "./BreedDialog.scss";

interface BreedDialogProps {
  open: boolean;
  handleClose: () => void;
  breedId?: string;
}

interface BreedFormData {
  name: string;
  description: string;
  origin: string;
  imageUrl?: string;
}

interface ErrorMap {
  [key: string]: string;
}

interface ErrorFields {
  field: string;
  message: string;
}

const BreedDialog: React.FC<BreedDialogProps> = ({
  open,
  handleClose,
  breedId,
}) => {
  const { dashboardState, updateList } = useContext(DashBoardContext);
  const [getCatBreeds] = useLazyQuery(GET_CAT_BREEDS, {
    variables: dashboardState.variables,
    fetchPolicy: "network-only",
    nextFetchPolicy: "standby",
    onCompleted: (data) => {
      updateList(data.getCatBreeds.catData);
    },
  });

  const [getCatBreedById, { loading, error }] = useLazyQuery(
    GET_CAT_BREED_BY_ID,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data) {
          setBreedForm({
            name: data.getCatBreedById.name,
            description: data.getCatBreedById.description,
            origin: data.getCatBreedById.origin,
            imageUrl: data.getCatBreedById.image.url,
          });
        }
      },
    }
  );

  const [errorForm, setErrorFrorm] = useState<ErrorMap>({});
  const [breedFrom, setBreedForm] = useState<BreedFormData>({
    name: "",
    description: "",
    origin: "",
    imageUrl: "",
  });

  const [addCatBreed] = useMutation(ADD_CAT_BREED, {
    variables: {
      data: breedFrom,
    },
    onCompleted: (data) => {
      if (data?.addCatBreed?.data) {
        closeDialog();
      } else if (data?.addCatBreed?.errors) {
        handleErrorForm(data?.addCatBreed?.errors);
      }
    },
  });
  const [updateCatBreed] = useMutation(EDIT_CAT_BREED, {
    variables: {
      id: breedId,
      data: breedFrom,
    },
    onCompleted: (data) => {
      if (data?.updateCatBreed?.data) {
        closeDialog();
      } else if (data?.updateCatBreed?.errors) {
        handleErrorForm(data?.updateCatBreed?.errors);
      }
    },
  });

  useEffect(() => {
    if (open && breedId) {
      getCatBreedById({ variables: { id: breedId } });
    }
    if (!open) {
      setBreedForm({
        name: "",
        description: "",
        origin: "",
        imageUrl: "",
      });
      setErrorFrorm({});
    }
  }, [open]);

  const closeDialog = () => {
    handleClose();
    getCatBreeds();
  };

  const handleErrorForm = (errors: ErrorFields[]) => {
    let errorData: ErrorMap = {};
    errors.forEach((e: ErrorFields) => {
      errorData = {
        ...errorData,
        [e.field]: e.message,
      };
    });
    setErrorFrorm(errorData);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBreedForm({
      ...breedFrom,
      [name]: value,
    });
  };

  if (error) return <div>{error.message}</div>;

  return (
    <Modal open={open} onClose={closeDialog}>
      <Box className="container">
        <form>
          <h1>{breedId ? "Cat Breed Edit" : "Add New Cat Breed"}</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                style={{ width: "100%" }}
                src={breedFrom.imageUrl}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = defaultLogo;
                }}
              />
            </Grid>
            <Grid style={{ gridRowGap: 10 }} container item xs={12} md={6}>
              <TextField
                fullWidth
                error={errorForm["name"] ? true : false}
                name="name"
                label="Name"
                variant="outlined"
                value={breedFrom.name}
                helperText={errorForm["name"]}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                fullWidth
                error={errorForm["origin"] ? true : false}
                name="origin"
                label="Origin"
                variant="outlined"
                value={breedFrom.origin}
                helperText={errorForm["origin"]}
                onChange={(e) => handleInputChange(e)}
              />
              <TextField
                fullWidth
                error={errorForm["imageUrl"] ? true : false}
                name="imageUrl"
                label="Image Url"
                variant="outlined"
                value={breedFrom.imageUrl}
                helperText={errorForm["imageUrl"]}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                error={errorForm["description"] ? true : false}
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={breedFrom.description}
                helperText={errorForm["description"]}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 1 }}
                onClick={closeDialog}
              >
                Cancel
              </Button>
              {breedId ? (
                <Button variant="contained" onClick={() => updateCatBreed()}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" onClick={() => addCatBreed()}>
                  Add
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {loading && <Loading size={150} />}
      </Box>
    </Modal>
  );
};

export default BreedDialog;
