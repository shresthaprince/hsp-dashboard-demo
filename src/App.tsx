import { memo, useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import Logo from "./assets/logo.png";
import AppText from "./components/common/AppText";
import BlankScreen from "./pages/BlankScreen";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";

type SidebarItemProps = {
  title: string;
  selected: boolean;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
};
const SidebarItem = memo(
  ({ title, selected, handleClick }: SidebarItemProps) => (
    <div
      className={`rounded-3 ${
        selected && "bg-primary"
      } d-flex align-items-center justify-content-center`}
      onClick={handleClick}
    >
      <AppText fontSize={3} themeColor="white" className="cursor-pointer">
        {title}
      </AppText>
    </div>
  )
);

const pages = {
  1: "Dashboard",
  2: "Candidates",
  3: "Sensors",
  4: "Notifications",
  5: "Settings",
};
const pagesArray = Object.entries(pages);
type pagesType = keyof typeof pages;

const App = () => {
  const [selectedPage, setSelectedPage] = useState<pagesType>(1);

  const handleClickSidebarItem = (key: pagesType) => setSelectedPage(key);

  const renderPage = useCallback(() => {
    switch (selectedPage) {
      case 1:
        return <Dashboard />;
      default:
        return <BlankScreen />;
    }
  }, [selectedPage]);

  return (
    <>
      <ToastContainer />
      <div className="bg-black d-flex flex-column h-100">
        <nav className="p-4">
          <img
            src={Logo}
            alt="Explor Logo"
            className="w-100"
            style={{ objectFit: "contain", maxWidth: 200 }}
          />
        </nav>
        <div className="d-flex flex-row flex-grow-1 bg-white">
          <div className="sidebar d-flex flex-column h-100 bg-black py-5 px-4 gap-5">
            {pagesArray.map(([key, pageTitle]) => (
              <SidebarItem
                title={pageTitle}
                key={key}
                selected={Number(key) === selectedPage}
                handleClick={() =>
                  handleClickSidebarItem(Number(key) as pagesType)
                }
              />
            ))}
          </div>
          <div className="d-flex flex-grow-1 bg-dark">{renderPage()}</div>
        </div>
      </div>
    </>
  );
};

export default App;
