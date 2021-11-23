import {
    ApolloClient, ApolloLink, InMemoryCache, createHttpLink,
} from '@apollo/client';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { createAuthLink } from 'aws-appsync-auth-link';
import AppSyncConfig from './AppSync';
import UserPool from './UserPool';

const getJwtToken = () => (new Promise((resolve, reject) => {
    UserPool.getCurrentUser()?.getSession((error: Error | null, session: CognitoUserSession | null) => {
        if (error) {
            reject(error.message)
        } else {
            resolve(session?.getIdToken().getJwtToken())
        }
    })
}))

const url = AppSyncConfig.ApiUrl;
const region = AppSyncConfig.Region;
const auth = {
    type: AppSyncConfig.AuthMode,
    jwtToken: async () => {
        const token = await getJwtToken()
        console.log(token);

        return token
    },
};
const link = ApolloLink.from([
    // @ts-ignore
    createAuthLink({ url, region, auth }),
    // @ts-ignore
    createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;