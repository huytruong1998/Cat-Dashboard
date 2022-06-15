import DashBoardTable from "./components/DashBoardTable";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./DashBoard.scss";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CAT_BREEDS } from "apollo/queries/breed-query";
import { useEffect, useState } from "react";
import { FETCH_CAT_BREEDS } from "apollo/mutations/breed-mutation";

const DashBoard = () => {
  const pageLimit = 10;
  const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");
  const [displayList, setDisplayList] = useState([]);
  const [getCatBreeds, { loading, error, data }] = useLazyQuery(
    GET_CAT_BREEDS,
    {
      variables: {
        page: page,
        limit: pageLimit,
        order: "desc",
        sort: "created_at",
        search,
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "standby",
      onCompleted: (data) => {
        setDisplayList(data.getCatBreeds.catData);
      },
    }
  );

  const [fetchCatBreeds] = useMutation(FETCH_CAT_BREEDS);

  useEffect(() => {
    getCatBreeds();
  }, []);

  const handleSearch = (text: string) => {
    setPage(1);
    setSearch(text);
  };

  const handlePrevPage = () => {
    if (page < 2) return;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (!data?.getCatBreeds?.hasMoreItems) return;
    setPage(page + 1);
  };

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="table-utils">
        <div className="table-utils__control">
          <input
            className="table-utils__control__search"
            placeholder="Search by text"
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Button variant="contained">Add New</Button>
        </div>
        <div className="table-utils__pagination">
          <Button variant="contained" onClick={() => fetchCatBreeds()}>
            <RefreshIcon></RefreshIcon>
          </Button>
          <div>
            {1 + (page - 1) * pageLimit}-{page * pageLimit}
          </div>
          <IconButton size="small" onClick={handlePrevPage}>
            <ArrowBackIosNewOutlinedIcon></ArrowBackIosNewOutlinedIcon>
          </IconButton>
          <IconButton size="small" onClick={handleNextPage}>
            <ArrowForwardIosOutlinedIcon></ArrowForwardIosOutlinedIcon>
          </IconButton>
        </div>
      </div>
      {loading && <div>Loading ......</div>}
      {!loading && data && data?.getCatBreeds?.catData && (
        <DashBoardTable data={displayList}></DashBoardTable>
      )}
    </>
  );
};

export default DashBoard;
