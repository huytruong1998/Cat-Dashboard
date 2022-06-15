import DashBoardTable from "./components/DashBoardTable";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./DashBoard.scss";

const DashBoard = () => {
  const data: any[] = [
    {
      id: "abob",
      name: "American Bobtail",
      description:
        "American Bobtails are loving and incredibly intelligent cats possessing a distinctive wild appearance. They are extremely interactive cats that bond with their human family with great devotion.",
    },
    {
      id: "jbob",
      name: "Japanese Bobtail",
      description:
        "The Japanese Bobtail is an active, sweet, loving and highly intelligent breed. They love to be with people and play seemingly endlessly. They learn their name and respond to it. They bring toys to people and play fetch with a favorite toy for hours. Bobtails are social and are at their best when in the company of people. They take over the house and are not intimidated. If a dog is in the house, Bobtails assume Bobtails are in charge.",
    },
    {
      id: "kuri",
      name: "Kurilian",
      description:
        "The character of the Kurilian Bobtail is independent, highly intelligent, clever, inquisitive, sociable, playful, trainable, absent of aggression and very gentle. They are devoted to their humans and when allowed are either on the lap of or sleeping in bed with their owners.",
    },
    {
      id: "pixi",
      name: "Pixie-bob",
      description:
        "Companionable and affectionate, the Pixie-bob wants to be an integral part of the family. The Pixie-Bob’s ability to bond with their humans along with their patient personas make them excellent companions for children.",
    },
  ];
  return (
    <>
      <div className="table-utils">
        <div className="table-utils__control">
          <input className="table-utils__control__search" />

          <Button variant="contained">Add New</Button>
        </div>
        <div className="table-utils__pagination">
          <Button variant="contained">
            <RefreshIcon></RefreshIcon>
          </Button>
          <div>1-50</div>
          <IconButton size="small">
            <ArrowBackIosNewOutlinedIcon></ArrowBackIosNewOutlinedIcon>
          </IconButton>
          <IconButton size="small">
            <ArrowForwardIosOutlinedIcon></ArrowForwardIosOutlinedIcon>
          </IconButton>
        </div>
      </div>

      <DashBoardTable data={data}></DashBoardTable>
    </>
  );
};

export default DashBoard;
