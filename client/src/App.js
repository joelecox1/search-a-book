import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  request: operation => {
    // retrieve the token from localStorage before each request
    const token = localStorage.getItem('id_token');
    // With this request configuration, we use the .setContext() method to set the HTTP request headers of every
    // request to include the token, whether the request needs it or not. This is fine, because if the request
    // doesn't need the token, our server-side resolver function won't check for it.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  // Note how we wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client variable
  // in as the value for the client prop in the provider, everything between the JSX tags will eventually have access
  // to the server's API data through the client we set up.
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
