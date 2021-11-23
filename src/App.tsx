import { ApolloProvider } from '@apollo/client';
import Demo from './components/EcgGraphContainer';
import client from './config/ApolloClient';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Demo />
    </ApolloProvider>
  )
}


export default App;
