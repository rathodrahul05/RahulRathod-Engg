import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import {
  closeModal,
  fetchItems,
  nextPage,
  selectedItem,
  showItem,
} from "../Redux/Actions/paginationAction";
import { DefaultState } from "../Redux/Reducers/paginationReducer";
import ItemsData from "./ItemsData";
import Spinner from "./Spinner";

interface Props {
  items: any[];
  totalItems: any[];
  loading: boolean;
  selectedItem: object | undefined;
  currentPage: number;
  error: string;
  itemsPerPage: number;
  pages: number;
}

function ListItem(props: Props) {
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    setTimeout(() => {
      let lI = (props.currentPage + 1) * props.itemsPerPage;
      let fI = lI - props.itemsPerPage;
      if (props.totalItems.length === 0) {
        dispatch(fetchItems(props.currentPage, fI, lI));
        dispatch(nextPage());
      } else {
        if (props.currentPage <= props.pages) {
          dispatch(fetchItems(props.currentPage, fI, lI));
          dispatch(showItem(fI, lI));

          dispatch(nextPage());
        }
      }
    }, 5000);
  }, [props.currentPage]);

  return (
    <>
      <p>
        Current Page {props.currentPage === 0 ? 0 : props.currentPage - 1} of{" "}
        {props.pages}
      </p>

      {props.loading && <Spinner />}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created At</th>
            <th>Author</th>
            <th>JSON</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item["title"]}</td>
                <td>{item["url"]}</td>
                <td>{item["created_at"]}</td>
                <td>{item["author"]}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log(item);
                      dispatch(selectedItem(item));
                    }}
                  >
                    Raw JSON
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    currentPage: state.currentPage,
    error: state.error,
    itemsPerPage: state.itemsPerPage,
    pages: state.pages,
  };
};
export default connect(mapStateToProps)(ListItem);
