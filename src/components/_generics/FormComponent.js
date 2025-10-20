const FormComponent = ({ fields, values, errors, onChange, onFileChange, onSubmit, submitLabel }) => {
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="row">
        {fields.map((field, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="form-group">
              <label>
                {field.label}{" "}
                {field.required && <span className="text-danger"><b>*</b></span>}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={onChange}
                  className="form-control"
                >
                  <option value="">- Select -</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={onFileChange}
                  className="form-control"
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={values[field.name] || false}
                  onChange={onChange}
                  className="form-check-input ms-2"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name] || ""}
                  onChange={onChange}
                  className="form-control"
                  placeholder={field.placeholder || ""}
                />
              )}

              {errors[field.name] && (
                <span className="text-danger">{errors[field.name]}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {submitLabel || "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FormComponent;