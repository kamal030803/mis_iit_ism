import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';
import { UserContext } from '../contexts/user.context';
import { useContext, useEffect } from 'react';

function Form() {
  const { userId, setUserId, session, setSession, year, setYear } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userID: '',
    session: '',
    year: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(formData.userID);
    setSession(formData.session);
    setYear(formData.year);
    localStorage.setItem('userId', formData.userID);
    localStorage.setItem('session', formData.session);
    localStorage.setItem('year', formData.year);
    //navigate('/requests');
    //console.log(formData.userID, formData.session);
  };

  return (
    <div>
      <img className='bimg' src='https://png.pngtree.com/thumb_back/fh260/background/20200729/pngtree-colorful-flow-background-with-fluid-form-image_372440.jpg'></img>
      <h1 className='msg'>Please enter the details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        <select
          name="session"
          value={formData.session}
          onChange={handleChange}
          required
          style={{
            padding: '6px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select Session</option>
          <option value="Monsoon">Monsoon</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
        </select>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          style={{
            marginLeft: '10px',
            padding: '6px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select Year</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>


        <button className='SUBMIT' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;


// transactions = [{}]
// transaction = {
//   settled : Boolean,
//   id: string
// }
// {transation.settled?<Button/>:null}