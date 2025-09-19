// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './Navbar'; // ✅ Import the Navbar component
// import Dashboard from './Dashboard';
// import Login from './Login';
// import Register from './Register';
// import NoMatchFound from './NoMatchpage';
// import Store from './Store'; // Assuming you have a Store component 

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* ✅ Invoke the Navbar */}
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route path="/login" component={Login} />
//         <Route path="/register" component={Register} />
//         <Route path="/dashboard" component={Dashboard} />
//         <Route path="/store" component={Store} /> {/* Assuming you have a Store component */}
//         <Route component={NoMatchFound} /> {/* 404 fallback */}
//       </Switch>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import NoMatchFound from './NoMatchpage';
import Store from './Store';
import ProductList from './ProductList'; // Assuming you have a ProductList component
import CartComponent from './Cart'; // Assuming you have a Cart component

import { UserProvider } from './UserContext'; // ✅ no 'contexts/' prefix needed
import { CartProvider } from './CartContext'; // ✅ no 'contexts/' prefix needed

function App() {
  return (
    <UserProvider>
      <CartProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/store" component={Store} />
          <Route path="/products" component={ProductList} />
          <Route path="/cart" component={CartComponent} />
          <Route component={NoMatchFound} />
        </Switch>
      </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
