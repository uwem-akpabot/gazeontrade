import swal from "sweetalert";
import axios from "axios";

/**
 * Generic delete handler with confirmation
 * @param {string} url - API endpoint for delete (e.g. `/api/delete-sample/1`)
 * @param {function} onSuccess - callback after successful delete (e.g. state update)
 */
export const handleDelete = (url, onSuccess) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(url).then((res) => {
        if (res.data.status === 200) {
          swal("Success", res.data.message, "success");
          if (onSuccess) onSuccess(res.data);
        } else {
          swal("Error", res.data.message, "error");
        }
      });
    }
  });
};