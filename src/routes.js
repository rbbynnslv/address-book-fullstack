import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/main/SignIn';
import Register from './components/main/Register';
import AddressBook from './components/main/AddressBook';
import ContactGroups from './components/main/ContactGroups';

export default function Router() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/main" component={AddressBook} />
        <Route path="/groups" component={ContactGroups} />
      </Switch>
    </>
  );
}
