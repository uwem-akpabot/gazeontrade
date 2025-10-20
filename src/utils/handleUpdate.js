import axios from "axios";
import swal from "sweetalert";

export const handleUpdate = async (
  e,
  endpoint,
  inputState,
  setInputState,
  fileState,
  setError
) => {
  e.preventDefault();

  const formData = new FormData();

  // append all fields dynamically
  Object.entries(inputState).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.append(key, value ? 1 : 0);
    } else {
      formData.append(key, value);
    }
  });

  // handle files if present
  if (fileState) {
    Object.entries(fileState).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });
  }

  try {
    formData.append("_method", "PUT");
    const res = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });


    if (res.data.status === 200) {
      swal("Success", res.data.message, "success");
      setError([]);
    } else if (res.data.status === 422) {
      swal("Validation Error", "", "warning");
      setError(res.data.errors);
    }
  } catch {
    swal("Error", "Something went wrong", "error");
  }
};
