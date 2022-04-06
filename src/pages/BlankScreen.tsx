import AppText from "../components/common/AppText";

const BlankScreen = () => {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <AppText fontSize={1} themeColor="red">
        Coming soon...
      </AppText>
    </div>
  );
};

export default BlankScreen;
