import React, { useState } from 'react';
import '../assets/Styles/Login.css'
const Login = () => {
  const [name, setName] = useState("SQI template");
  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user2 = (i) => {
    setEmail(i.target.value);
  };
  const user3 = (i) => {
    setPassword(i.target.value);
  };

  const changeName = () => {
    const newUser = {
      email,
      password,
    };

    setAllUsers((prevUsers) => [...prevUsers, newUser]);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mx-auto p-4 ">
      <table className="table-auto w-full mb-8 bg-red-600 h-auto overflow-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <div id='form'>
      <div id="form-body">
        <div id="welcome-lines">
          <div id="welcome-line-1">Spotify</div>
          <div id="welcome-line-2">Welcome Back, Loyd</div>
        </div>
        <div id="input-area">
          <div class="form-inp">
            <input type="email"
          onChange={user2}
          placeholder="Email"
          value={email}/>
          </div>
          <div class="form-inp">
            <input type="password"
          onChange={user3}
          placeholder="Password"
          value={password}/>
          </div>
        </div>
        <div id="submit-button-cvr">
          <button id="submit-button" type='submit'  onClick={changeName}>Login</button>
        </div>
        <div id="forgot-pass">
          <a href="#">Forgot password?</a>
        </div>
        <div id="bar"></div>
      </div>
    </div>

    </div>
  );
};

export default Login;
