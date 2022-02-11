import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  const titleCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {titleCase(item).replace("-", " ")}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
