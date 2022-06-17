import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { RowElement } from "../DashBoard";
import { Loading } from "components/loading/loading";
import { DELETE_CAT_BREED } from "apollo/mutations/breed-mutation";

interface TableProps {
  data: RowElement[];
  refetch: () => void;
  loading: boolean;
}

const DashBoardTable: React.FC<TableProps> = ({ data, refetch, loading }) => {
  const [deleteCatBreeds] = useMutation(DELETE_CAT_BREED, {
    onCompleted: () => {
      refetch();
    },
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: RowElement) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        deleteCatBreeds({ variables: { id: row?.id } })
                      }
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <Loading size={150} />}
    </div>
  );
};

export default DashBoardTable;
