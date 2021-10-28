import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";

import {
  closeModal,
  fetchItemsRequest,
  fetchItemsSuccess,
  showItem,
} from "../Redux/Actions/paginationAction";
import { DefaultState } from "../Redux/Reducers/paginationReducer";
import ItemsData from "./ItemsData";
import Spinner from "./Spinner";
import TableComponent from "./TableComponent";

interface Props {
  items: any[];
  totalItems: any[];
  loading: boolean;
  selectedItem: object | undefined;
  itemsPerPage: number;
  pages: number;
}

function ListItem(props: Props) {
  const [page, setpage] = useState(0);

  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(closeModal());
  };
  let lastIndex = page * 20;
  let firstIndex = lastIndex - 20;
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
        // dispatch(showItem(fIndex, lIndex));
      });
  };

  useEffect(() => {
    // let lIndex = (page + 1) * props.itemsPerPage;
    // let fIndex = lIndex - props.itemsPerPage;
    if (props.totalItems.length === 0) {
      getData();
      setpage(page+1)
    }
    setTimeout(() => {
      if (page < props.pages) {
        getData();
        return(page===0?0:setpage(page+1))
       
      }
    }, 10000);
  }, [props.totalItems.length]);

  return (
    <>
      <p>
        current page {page} of {props.totalItems.length / 20}
      </p>
      <button
        className="btn btn-info m-1"
        disabled={page <= 0}
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="btn btn-info m-1"
        disabled={page >= props.totalItems.length/20}
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

const mapStateToProps = (state: DefaultState) => {
  return {
    items: state.items,
    totalItems: state.totalItems,
    loading: state.loading,
    selectedItem: state.selectedItem,
    itemsPerPage: state.itemsPerPage,
    pages: state.pages,
  };
};
export default connect(mapStateToProps)(ListItem);
