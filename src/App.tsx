import React from 'react';
import Client from "aws-appsync";
import {
  ApolloProvider,
} from "@apollo/client";
import AppSync from "./config/AppSync";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import UserPool from './config/UserPool';
import EcgGraphContainer from './components/EcgGraphContainer';

type AppProps = {
  setUser: React.Dispatch<React.SetStateAction<CognitoUserSession | null>>
}

let client: any = null;

UserPool.getCurrentUser()?.getSession((error: Error | null, session: CognitoUserSession | null) => {
  if (error) {
    console.log(error);
  } else {
    try {
      client = new Client({
        url: AppSync.ApiUrl,
        region: AppSync.Region,
        auth: {
          type: "AMAZON_COGNITO_USER_POOLS",
          jwtToken: session?.getIdToken().getJwtToken()!
        }
      })
    } catch (error) {
      UserPool.getCurrentUser()?.signOut();
    }
  }
})


const App = ({ setUser }: AppProps) => {

  if (client) {
    return (<ApolloProvider client={client}>
      <div className="bg-primary h-100">
        <EcgGraphContainer />
      </div>
    </ApolloProvider>)
  } else {
    // Logout user
    setUser(null);
    return <></>;
  }
}


export default App;
