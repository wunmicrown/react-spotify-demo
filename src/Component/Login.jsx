

import React, { useState } from 'react'

const Login = () => {
    const [name, setName] = useState("SQI template")
    const [allUsers, setAllUsers] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const user = (i) =>{
      setFirstName(i.target.value)
    }
    const user1 = (i) =>{
      setLastName(i.target.value)
    }
    const user2 = (i) =>{
      setEmail(i.target.value)
    }
    const user3 = (i) =>{
      setPassword(i.target.value)
    }

   

    const changeName = () =>{
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

      // console.log(allUsers);
    }
    
  return (
    <div>
      <h2>
        {name}
      </h2>
        <h1>
        {allUsers.map((user, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            {user.firstName} {user.lastName} {user.email} {user.password}
          </tr>
        ))}
        </h1>

        <input type="text" onChange={user} placeholder='first name' value={firstName} />
        <input type="text" onChange={user1} placeholder='last name' value={lastName} />
        <input type="text" onChange={user2} placeholder='last name'  value={email} />
        <input type="text" onChange={user3} placeholder='last name' value={password}/>
        <button onClick={changeName}>change name</button>
    </div>
  )
}

export default Login