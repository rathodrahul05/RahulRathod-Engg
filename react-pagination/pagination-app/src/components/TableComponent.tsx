import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { selectedItem } from '../Redux/Actions/paginationAction';
import { DefaultState } from "../Redux/Reducers/paginationReducer";
interface Props{
    items:any[]
}
function TableComponent(props:Props) {

    const dispatch = useDispatch()
    return (
        <div>
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
        </div>
    )
}
const mapStateToProps = (state: DefaultState) => {
    return {
      items: state.items,
      
    };
  };
  export default connect(mapStateToProps)(TableComponent)
