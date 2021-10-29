
import { connect, useDispatch } from "react-redux";
import { selectedItem } from "../Redux/Actions/paginationAction";

interface Props {
  totalItem: any[];
  first: number;
  last: number;
  filter: any;
}
function TableComponent(props: Props) {
  const dispatch = useDispatch();

  let items = props.totalItem.slice(props.first, props.last).filter((item) => {
    return (
      item["title"].toLowerCase().includes(props.filter.text.toLowerCase()) ||
      item["created_at"].includes(props.filter.text)
    );
  });

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
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item["title"]}</td>
                <td>{item["url"]}</td>
                <td>
                  {" "}
                  {new Date(item["created_at"]).toISOString().split("T")[1]}
                </td>
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
      {items.length === 0 && <p className="text-center">No records found</p>}
    </div>
  );
}
const mapStateToProps = (state: any) => {
  let { pagination, filter } = state;
  return {
    totalItem: pagination.totalItems,
    filter: filter,
  };
};
export default connect(mapStateToProps)(TableComponent);
