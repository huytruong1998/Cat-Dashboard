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
  // const [displayList, setDisplayList] = useState<any[]>([]);
  const [getCatBreeds, { loading, error, data, refetch }] = useLazyQuery(
    GET_CAT_BREEDS,
    {
      variables: {
        page: page,
        limit: pageLimit,
        order: "desc",
        sort: "created_at",
        search: "",
      },
      fetchPolicy: "network-only",
    }
  );

  const [fetchCatBreeds, { data: fetchData }] = useMutation(FETCH_CAT_BREEDS);

  useEffect(() => {
    getCatBreeds();
  }, []);

  useEffect(() => {
    setPage(1);
    refetch({
      page: page,
      limit: pageLimit,
      order: "desc",
      sort: "created_at",
      search,
    });
  }, [fetchData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      refetch({
        page: page,
        limit: pageLimit,
        order: "desc",
        sort: "created_at",
        search,
      });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
            onChange={(e) => setSearch(e.target.value)}
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
        <DashBoardTable data={data?.getCatBreeds?.catData}></DashBoardTable>
      )}
    </>
  );
};

export default DashBoard;
