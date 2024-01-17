import React from "react";
import InputContainer from "../inputContainer/inputContainer";
import classes from "./input.module.css";

// we'r not exporting it as default.
function Input(
  { label, type, defaultValue, onChange, onBlur, name, error },
  ref // register function in loginpage is responsible for creating a reference passing it here so this ref will be set to the inputs that we want to define and by doing this these onblur and onchange func are going to work fine.
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;
    // defaults
    switch (error.type) {
      case "required":
        return "This Field is Required";
      case "minLength":
        return "Field is Too Short";
      default:
        return "*";
    }
  };

  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue} // these are created by us till placeholder
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}  // these parameters are created by useform of react hook form ref,name,onchange/blur
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
// you need to do this whenver you have something like this input inside your custom component
// and you want to forward its reference to parent component.
