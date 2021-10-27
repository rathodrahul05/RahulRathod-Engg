import React from 'react'
import { connect, useDispatch } from 'react-redux';
import { filterLogic } from '../FilteredItems/filterLogic';
import { selectedItem } from '../Redux/Actions/paginationAction';

interface Props{
    items:any[],
   
}
function TableComponent(props:Props) {
 


    const dispatch = useDispatch()
    return (
        <div>
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
          {props.items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item["title"]}</td>
                <td>{item["url"]}</td>
                <td> {new Date(item["created_at"]).toISOString().split('T')[1]}</td>
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
const mapStateToProps = (state:any) => {
  let {pagination,filter}=state
    return {
     
      items: filterLogic(pagination.items,filter.text)
      
    };
  };
  export default connect(mapStateToProps)(TableComponent)
