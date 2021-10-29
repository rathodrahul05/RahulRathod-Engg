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
  const [currentPage, setcurrentPage] = useState(0);

  const dispatch = useDispatch();
  let lastIndex = (currentPage + 1) * 20;
  let firstIndex = lastIndex - 20;

  const handleModal = () => {
    dispatch(closeModal());
  };
  const handleNext = () => {
    setcurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    setcurrentPage(currentPage - 1);
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
    // eslint-disable-next-line
  }, [props.totalItems.length]);

  return (
    <>
      <ListFilter />
      <p style={{fontWeight:'bold'}} className="mx-2">
        current page {currentPage + 1} of {props.totalItems.length / 20}
      </p>
      <button
        className="btn btn-info m-2"
        disabled={currentPage <= 0}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="btn btn-info m-2"
        disabled={currentPage >= props.totalItems.length / 20 - 1}
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
