import theme from "../../config/theme";

type AppTextProps = {
  themeColor?: keyof typeof theme;
  fontSize?: number;
};

const AppText = ({
  className,
  themeColor = "black",
  fontSize = 5,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  AppTextProps) => {
  return (
    <span
      {...rest}
      className={`ff-bebas-kai fs-${fontSize} text-${theme[themeColor]} ${className}`}
    ></span>
  );
};

export default AppText;
