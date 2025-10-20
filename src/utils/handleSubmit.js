import axios from "axios";
import swal from "sweetalert";

export const handleSubmit = async (
  e,
  endpoint,
  inputState,
  setInputState,
  fileState,
  setError,
  initialState
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
    const res = await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === 200) {
      swal("Success", res.data.message, "success");
      setInputState(initialState); // reset to blank
      setError([]);
    } else if (res.data.status === 422) {
      swal("Required fields are empty", "", "");
      setError(res.data.errors);
    }
  } catch {
    swal("Error", "Something went wrong", "error");
  }
};