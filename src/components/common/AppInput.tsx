import React from "react";

const AppInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ className, ...rest }, ref) => {
  return (
    <input
      {...rest}
      className={`ff-bebas-kai text-black border-2 border-primary form-control ${className}`}
      ref={ref}
    />
  );
});

export default AppInput;
