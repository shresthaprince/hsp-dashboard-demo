const AppButton = ({
  className,
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      {...rest}
      className={`ff-bebas-kai text-white btn btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

export default AppButton;
