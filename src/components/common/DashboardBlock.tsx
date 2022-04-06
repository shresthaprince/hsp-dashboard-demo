import AppText from "./AppText";

type SmallDashboardBlockProps = {
  title: string;
};
export const SmallDashboardBlock: React.FC<SmallDashboardBlockProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-black rounded-3 p-3 d-flex flex-column align-items-center gap-3 w-100">
      <AppText themeColor="red" fontSize={5}>
        {title}
      </AppText>
      {children}
    </div>
  );
};

type BigDashboardBlockProps = {
  title: string;
};
export const BigDashboardBlock: React.FC<BigDashboardBlockProps> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-black rounded-3 p-3 d-flex flex-column align-items-center gap-3 w-100">
      <AppText className="align-self-start" themeColor="red" fontSize={5}>
        {title}
      </AppText>
      {children}
    </div>
  );
};
