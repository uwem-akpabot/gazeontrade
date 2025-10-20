const SkeletonTable = ({ columns, rows = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx}>
          {columns.map((_, colIdx) => (
            <td key={colIdx}>
              <div className="bg-dark bg-opacity-25 rounded" style={{ height: "20px" }}></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default SkeletonTable;