import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import {
  closeModal,
  fetchItemsRequest,
  fetchItemsSuccess,
} from "../Redux/Actions/paginationAction";
import ItemsData from "./ItemsData";
import ListFilter from "./ListFilter";
import Spinner from "./Spinner";
import TableComponent from "./TableComponent";

interface Props {
  totalItems: any[];
  loading: boolean;
  selectedItem: object | undefined;
  itemsPerPage: number;
  pages: number;
}

function ListItem(props: Props) {
  const [page, setpage] = useState(0);

  const dispatch = useDispatch();
  let lastIndex = page * 20;
  let firstIndex = lastIndex - 20;

  const handleModal = () => {
    dispatch(closeModal());
  };
  const handleNext = () => {
    if (page < props.totalItems.length / 20) {
      setpage((curpage) => curpage + 1);
    }
  };
  const handlePrev = () => {
    setpage((curpage) => curpage - 1);
  };
  const getData = async () => {
    dispatch(fetchItemsRequest());
    await axios
      .get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      )
      .then((response: any) => {
        const items = response.data;

        dispatch(fetchItemsSuccess(items));
      });
  };

  useEffect(() => {
    if (props.totalItems.length === 0) {
      getData();
      setpage((curpage) => curpage + 1);
    }
    setTimeout(() => {
      if (page < props.pages) {
        getData();
        setpage((curpage) => curpage + 1);
      }
    }, 10000);
  }, [props.totalItems.length]);

  return (
    <>
      <ListFilter />
      <p>
        current page {page} of {props.totalItems.length / 20}
      </p>
      <button
        className="btn btn-info m-2"
        disabled={page <= 0}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="btn btn-info m-2"
        disabled={page >= props.totalItems.length / 20}
        onClick={handleNext}
      >
        Next
      </button>
      {props.loading && <Spinner />}
      <TableComponent first={firstIndex} last={lastIndex} />

      <ItemsData selectedItem={props.selectedItem} handleModal={handleModal} />
    </>
  );
}

const mapStateToProps = (state: any) => {
  let { pagination } = state;
  return {
    totalItems: pagination.totalItems,
    loading: pagination.loading,
    selectedItem: pagination.selectedItem,
    itemsPerPage: pagination.itemsPerPage,
    pages: pagination.pages,
  };
};
export default connect(mapStateToProps)(ListItem);
