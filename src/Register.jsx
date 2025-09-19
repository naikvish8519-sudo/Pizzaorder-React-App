// import React, { useState } from 'react';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     dateOfBirth: '',
//     gender: '',
//     country: '',
//     receiveNewsLetters: false,
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setSuccess('');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           fullName: formData.fullName,
//           dateOfBirth: formData.dateOfBirth,
//           gender: formData.gender,
//           country: formData.country,
//           receiveNewsLetters: formData.receiveNewsLetters,
//         }),
//       });

//       if (response.ok) {
//         setSuccess('Registration successful!');
//         setError('');
//         setFormData({
//           fullName: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//           dateOfBirth: '',
//           gender: '',
//           country: '',
//           receiveNewsLetters: false,
//           role: 'user', // Default role for new users
//         });
//       } else {
//         setError('Failed to register. Try again.');
//         setSuccess('');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred. Please try again.');
//       setSuccess('');
//     }
//   };

//   return (
//     <div className="container vh-100 d-flex justify-content-center align-items-center">
//       <form onSubmit={handleSubmit} className="p-4 border rounded bg-light w-100" style={{ maxWidth: 500 }}>
//         <h2 className="mb-4 text-center">Register</h2>

//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}

//         <div className="mb-3">
//           <label className="form-label">Full Name</label>
//           <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email address</label>
//           <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Confirm Password</label>
//           <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Date of Birth</label>
//           <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Gender</label>
//           <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">-- Select --</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Country</label>
//           <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
//         </div>

//         <div className="form-check mb-3">
//           <input className="form-check-input" type="checkbox" name="receiveNewsLetters" checked={formData.receiveNewsLetters} onChange={handleChange} />
//           <label className="form-check-label">Subscribe to Newsletters</label>
//         </div>

//         <button type="submit" className="btn btn-primary w-100">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pizza.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ boolean toggle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:7186/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          personName: formData.fullName,
          gender: formData.gender,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setError("");
      } else {
        setError("Failed to register. Try again.");
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setSuccess(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
    setSuccess(false); // ✅ show form again
  };

  return (
    <div className="productlist-wrapper">
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="p-4 border rounded bg-light w-100"
        style={{ maxWidth: 500 }}
      >
        {/* ✅ Always show Register title */}
        <h2 className="mb-4 text-center" style={{ color: "black" }}>
          Register
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* ✅ Success state */}
        {success ? (
          <div className="text-center">
            <div className="alert alert-success">
              Registration successful!
            </div>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <button onClick={resetForm} className="btn btn-secondary">
                Register Another User
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "black" }}>
                Gender
              </label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="Male">Male</option> {/* ✅ Matches DB */}
                <option value="Female">Female</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Register;
