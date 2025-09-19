
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from './UserContext';
import "./pizza.css"; // ✅ Import the context hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { login } = useUser(); // ✅ Get the login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  try {
  debugger;
   console.log('Login request payload:', { email, password });
  const response = await fetch('http://localhost:7186/api/Auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     

      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    // log details of response error
    const errorText = await response.text();
    console.error('Login failed:', response.status, response.statusText, errorText);
    throw new Error('Invalid login credentials');
  }

  const data = await response.json();

  // ✅ Save user info in context
  login(data);

  // redirect after login
  history.push('/products');

} catch (err) {
  console.error('Login error:', err); // clearer logging
  setError('Invalid email or password.');
}

  };
  //   try {
  //     const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
  //     const users = await response.json();

  //     if (users.length > 0) {
  //       // ✅ Use context to log in and store user
  //       login(users[0]); 
  //       history.push('/dashboard');
  //     } else {
  //       setError('Invalid email or password.');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError('Something went wrong. Please try again.');
  //   }
  // };

  return (
    <div className="productlist-wrapper">
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={handleLogin} className="p-4 border rounded bg-light" style={{ maxWidth: 400, width: '100%' }}>
        <h2 className="mb-4 text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "black" }}>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
