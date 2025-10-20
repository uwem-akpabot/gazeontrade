import { useEffect } from "react";
import SkeletonTable from "./SkeletonTable";

const TableComponent = ({ id = "basic-datatables", columns, data, renderRow, loading }) => {
  // Initialize DataTable only when not loading and data exists
  useEffect(() => {
    if (!loading && window.$ && !window.$.fn.DataTable.isDataTable(`#${id}`)) {
      window.$(`#${id}`).DataTable();
    }
  }, [data, id, loading]);

  return (
    <div className="table-responsive">
      <table id={id} className="display table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>

        {loading ? (
          <SkeletonTable columns={columns} rows={5} />
        ) : (
          <tbody>
            {data.map((item, i) => renderRow(item, i))}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default TableComponent;