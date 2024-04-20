import React, { useState } from 'react';

const IfscAccountComponent = ({ complaint_id, orderId, passReload, onSubmit }) => {
  const [ifscCode, setIfscCode] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const handleSubmit = async () => {
    try {
      console.log(ifscCode, accountNo, orderId)
      const response = await fetch(`http://localhost:8000/api/refund-ac/update/${complaint_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify({
          ifsc_code: ifscCode,
          account_number: accountNo,
        }),
      });
      if (response.ok) {
        const xx = await response.json();
        // Handle success response
        console.log('Data posted successfully', xx);
        passReload();
      } else {
        // Handle error response
        console.error('Failed to post data:', response.statusText);
      }
    } catch (error) {
      // Handle network error or other exceptions
      console.error('Failed to post data:', error);
    }
  };

  // const handleSubmit = () => {
  //   // Validation logic goes here
  //   if (ifscCode.trim() === '' || accountNo.trim() === '') {
  //     alert('Please enter IFSC code and account number');
  //     return;
  //   }

  //   // Call onSubmit function with order_id, ifscCode, and accountNo
  //   onSubmit(orderId, ifscCode, accountNo);

  //   // Clear input fields after submission
  //   setIfscCode('');
  //   setAccountNo('');
  // };

  return (
    <div key={complaint_id}>
      Refund accepted, Enter A/c Details
      <hr />
      <label htmlFor="ifsc">IFSC Code:</label>
      <input
        type="text"
        id="ifsc"
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
      />
      <label htmlFor="accountNo">Account Number:</label>
      <input
        type="text"
        id="accountNo"
        value={accountNo}
        onChange={(e) => setAccountNo(e.target.value)}
      />
      <button style={{ fontSize: '12px', padding: '6px 10px' }} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default IfscAccountComponent;
