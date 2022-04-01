import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
	},
	query: {
		fetchPolicy: 'no-cache',
	}
}

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});


export default client;