import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient ,InMemoryCache ,ApolloProvider} from '@apollo/client/core';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY = "williston::stepzen.net+1000::b755a7150e0e3a92fe0aba992d3c55673e3ac5fff8b3cb054c3169d3c804294f";

const client = new ApolloClient({
uri: "https://williston.stepzen.net/api/oily-snake/__graphql",
 headers:{
Authorization :'ApiKey ${}',


},
cache: new InMemoryCache(),

});
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client ={client}>


        </ApolloProvider>
        {/* <Navigation colorScheme={colorScheme} /> */}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
