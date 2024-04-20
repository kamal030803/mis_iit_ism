import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './requestList.css';
import { UserContext } from '../contexts/user.context';
import IfscAccountComponent from '../components/ifscaccount.component';
import loadingGif from './../loading.gif';
function RequestList() {
  const { userId, session, setUserId, setSession, year, setYear } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [refundLogs, setRefundLogs] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const [reload, setReload] = useState(0);
  const passReload = () => {
    setReload(reload + 1);
  }
  const filteredTransactions = filter ? transactions.filter(entry => entry['description'] === filter) : transactions;
  const handleViewStatusClick = () => {
    navigate('status');
  };
  const removeUser = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('session');
    setSession(null);
    setUserId(null);
  }
  const getTransactions = async (id, session) => {
    try {
      const response = await fetch(`http://localhost:8000/api/transactionsList/${id}/${session}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('GET request successful:', responseData);
      const xx = responseData.transactions;
      const session_year_filter = xx.filter((element) => element.session_year === year);
      console.log(year, session_year_filter);
      setTransactions(session_year_filter)
      return session_year_filter;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getRefundLogs = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/refund-logs/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log('GET request successful:', responseData);
      setRefundLogs(responseData)
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const refundApply = async (order_no) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/refund/${userId}/${order_no}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      const transactionsCopy = transactions;
      const refundCopy = refundLogs;
      transactions.forEach(function (cur, i) {
        if (cur.order_no == order_no) transactionsCopy[i].status = 1;
      })
      refundLogs.forEach(function (cur, i) {
        if (cur.order_no == order_no) refundCopy[i].status = 1;
      })
      setTransactions(transactionsCopy);
      setRefundLogs(refundCopy);
      return responseData;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const getTransactionAndRefundLogs = async () => {
    setLoading(true);
    const transactions = await getTransactions(userId, session);
    const refundLogs = await getRefundLogs(userId);
    const transactionsCopy = transactions;
    console.log(transactions, refundLogs);
    transactions.forEach(function (cur, i) {
      const findE = refundLogs.find(x => x.order_no == cur.order_no);
      if (findE) {
        transactionsCopy[i]['status'] = findE.status - 0;
        transactionsCopy[i]['complaint_id'] = findE.complaint_id;
      }
      else transactionsCopy[i]['status'] = 0;
    })
    console.log("xxx", transactionsCopy);
    setTransactions(transactionsCopy);
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }
  useEffect(() => {
    getTransactionAndRefundLogs();
  }, [reload]);
  return (
    <>
      {loading && <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>}
      {/* {transactions.length === 0 ?
        <div className='flex-add'>
          <h1>No transactions</h1>
          <img className="noTrans" src="https://www.mindgems.com/article/wp-content/uploads/2021/01/list-empty-folders.webp"></img>
        </div>
        : */}
      <div className='flex-add'>
        <h1>Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Session</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Description
                {/* <label htmlFor="filter">Filter by Description: </label> */}
                <select id="filter" value={filter} onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="multiple payment">Multiple Payment</option>
                  <option value="failed">Failed</option>
                  <option value="settled">Settled</option>
                </select>
              </th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((entry, index) => (
              <tr key={index}>
                <td>{userId}</td>
                <td>{session + " " + year}</td>
                <td>{entry['amount']}</td>
                <td>{entry['order_no']}</td>
                <td>{entry['description']}</td>
                <td>{entry['payment_date']}</td>
                <td>
                  {entry['description'] === 'multiple payment' && (() => {
                    switch (entry['status']) {
                      case -1:
                        return ("Request Failed")
                        break;
                      case 0:
                        return (<button onClick={() => refundApply(entry['order_no'])}>
                          Refund Request</button>)
                        break;
                      case 1:
                        return "Refund Requested"
                        break;
                      case 2:
                        return <IfscAccountComponent {...entry} passReload={passReload} />
                        break;
                      case 3:
                        return "We have received your bank details"
                        break;
                      default:
                        return ""
                    }

                  })()}
                  {/* {entry['description'] === 'multiple payment' ?
                      <button onClick={() => refundApply(entry['order_no'])}
                        disabled={loading}>
                        {loading ? 'Loading...' : (() => {
                          switch (entry['status']) {
                            case 0:
                              return "Request Refund"
                              break;
                            case 1:
                              return "Refund Requested"
                              break;
                            case 2:
                              return ""
                              break;
                            case 3:
                              return ""
                              break;
                            default:
                              return ""
                          }

                        })()}</button> : '-'} */}
                  {/* {entry[5] === 'notSettled' && <div className='flex-add'>You have already applied for the refund   <button onClick={handleViewStatusClick}>View Status</button></div>} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table >
      </div >
      {/* } */}
      <div className='logout'>
        <button onClick={removeUser}>change user</button>
      </div>
    </>
  );
}

export default RequestList;
