import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { ADD_USER } from '../utils/mutations.js';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        username: formState.username,
        phone: formState.phone,
        Language: formState.language

      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const verifyPassword = () => {
    if (formState.password === formState.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
            />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={
              verifyPassword() ? handleChange : () => console.log('Passwords do not match!')
            }
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="confirmPwd">Confirm Password:</label>
          <input
            placeholder="******"
            name="confirmPassword"
            type="password"
            id="confirmPwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="phone">Phone:</label>
            <input
                placeholder="123-456-7890"
                name="phone"
                type="phone"
                id="phone"
                onChange={handleChange}
            />
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="Desired Language">Choose your Primary Language:</label>
            <select
                name="language"
                id="language"
                onChange={handleChange}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="zh">Chinese</option>
            </select>
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="profile-picture">You can set a profile picture now or latter in profile settings</label>
            <input 
                type="file"
                id="profile-picture"
                name="profile-picture"
                accept="image/png, image/jpeg"
            />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
