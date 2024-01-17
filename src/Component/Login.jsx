import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState("SQI template");
  const [allUsers, setAllUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = (i) => {
    setFirstName(i.target.value);
  };
  const user1 = (i) => {
    setLastName(i.target.value);
  };
  const user2 = (i) => {
    setEmail(i.target.value);
  };
  const user3 = (i) => {
    setPassword(i.target.value);
  };

  const changeName = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    setAllUsers((prevUsers) => [...prevUsers, newUser]);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      
      <table className="table-auto w-full mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2">{user.lastName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          onChange={user}
          placeholder="First Name"
          value={firstName}
          className="border px-4 py-2 w-1/4"
        />
        <input
          type="text"
          onChange={user1}
          placeholder="Last Name"
          value={lastName}
          className="border px-4 py-2 w-1/4"
        />
        <input
          type="text"
          onChange={user2}
          placeholder="Email"
          value={email}
          className="border px-4 py-2 w-1/4"
        />
        <input
          type="text"
          onChange={user3}
          placeholder="Password"
          value={password}
          className="border px-4 py-2 w-1/4"
        />
        <button
          onClick={changeName}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Name
        </button>
      </div>
    </div>
  );
};

export default Login;
