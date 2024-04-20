import { React, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/form';
import RequestList from './pages/requestList';
import Status from './pages/status';
import { UserContext } from './contexts/user.context';

function App() {
  const { userId } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={userId ? <RequestList /> : <Form />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/requests/status" element={<Status />} />
      </Routes>
    </Router>
  );
}
export default App;
