import { ApolloProvider } from '@apollo/client';
import EcgGraph from './components/EcgGraph';
import client from './config/ApolloClient';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <EcgGraph />
    </ApolloProvider>
  )
}


export default App;
