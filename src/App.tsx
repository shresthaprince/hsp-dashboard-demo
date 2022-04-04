import { ApolloProvider } from "@apollo/client";
import EcgGraph from "./components/EcgGraph";
import client from "./config/ApolloClient";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="bg-black h-100 p-5">
        <div className="pt-3">
          <h1 className="ff-orbitron text-white ms-3 mb-3">
            Heart Rate Monitor
          </h1>
          <EcgGraph />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
