import React from "react";
import { connect, useDispatch } from "react-redux";
import { selectedItem } from "../Redux/Actions/paginationAction";
import { DefaultState } from "../Redux/Reducers/paginationReducer";
interface Props {
  totalItem: any[];
  first: number;
  last: number;
}
function TableComponent(props: Props) {
  const dispatch = useDispatch();
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created At</th>
            <th>Author</th>
            <th>JSON</th>
          </tr>
        </thead>
        <tbody>
          {props.totalItem.slice(props.first, props.last).map((item, index) => {
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
    </div>
  );
}
const mapStateToProps = (state: DefaultState) => {
  return {
    totalItem: state.totalItems,
  };
};
export default connect(mapStateToProps)(TableComponent);
