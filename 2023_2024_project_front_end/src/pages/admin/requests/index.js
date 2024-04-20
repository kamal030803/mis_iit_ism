// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AdminReq = ({ refundRequests }) => {
    const [requests, setRequests] = useState(refundRequests);
    const [expandedRow, setExpandedRow] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const getRefundRequests = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/request-details", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Add any additional headers or options as needed
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
                console.log(data);
            } else {
                console.error('Failed to fetch data:', res.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }


    }
    useEffect(() => {
        getRefundRequests();
    }, []);
    async function addRefund(complaint_id) {
        const element = requests.find(entry => entry.complaint_id === complaint_id);
        console.log(element);
        const send = { complaint_id, date_of_payment: element.date_of_payment, date_of_request: element.created_at, user_id: element.user_id, session: element.session + " " + element.session_year, order_id: element.order_no, amount: element.amount };
        console.log(send);
        try {
            const response = await fetch('http://localhost:8000/api/refund-ac/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(send)
            });

            if (!response.ok) {
                throw new Error('Failed to add accepted refund');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to add accepted refund')
            // Handle error or display error message to the user
        }
    }
    async function updateRefundTable(complaintId, status) {
        try {
            const response = await fetch('http://localhost:8000/api/refund/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ complaint_id: complaintId, status })
            });

            if (!response.ok) {
                throw new Error('Failed to update refund table');
            }
            const data = await response.json();
            console.log('Refund table updated successfully', data);
            const updatedRequests = requests.filter(request => request.complaint_id !== complaintId);
            // Update the state with the filtered array
            return updatedRequests;
        } catch (error) {
            console.error('Error updating refund table:', error.message);
            // Handle error or display error message to the user
        }
    }

    const handleAccept = async (requestId) => {
        // Placeholder logic for accepting the request
        try {
            console.log(`Accepted request with ID: ${requestId}`);
            const refund = await addRefund(requestId);
            const updatedReq = await updateRefundTable(requestId, 2);
            setRequests(updatedReq);
            console.log("refund addred", refund, "request status updated", updatedReq)
        } catch (err) {
            console.log("error", err);
        }
    };

    const handleReject = async (requestId) => {
        // Placeholder logic for rejecting the request
        console.log(`Rejected request with ID: ${requestId}`);
        const updatedReq = await updateRefundTable(requestId, -1);
        setRequests(updatedReq);
    };


    const handleExpand = (rowIndex) => {
        setExpandedRow(rowIndex === expandedRow ? null : rowIndex);
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card elevation={3} sx={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                    <CardHeader title='Manage New Requests 🙌'></CardHeader>
                    <CardContent>
                        <Typography sx={{ mb: 2 }}>Admin Dashboard</Typography>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Action</th>
                                        <th style={{ textAlign: 'center' }}>User ID</th>
                                        <th style={{ textAlign: 'center' }}>Order ID</th>
                                        <th style={{ textAlign: 'center' }}>Session</th>
                                        <th style={{ textAlign: 'center' }}>Amount</th>
                                        <th style={{ textAlign: 'center' }}>Date/Time Payment</th>
                                        <th style={{ textAlign: 'center' }}>Date of Request</th>
                                        {showMore && (
                                            <>
                                                <th style={{ textAlign: 'center' }}>Status</th>
                                                <th style={{ textAlign: 'center' }}>Pay Code</th>
                                                <th style={{ textAlign: 'center' }}>Payment Gateway</th>
                                                <th style={{ textAlign: 'center' }}>Branch</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests && requests.map((request, index) => request.status == 1 && (
                                        <React.Fragment key={request.order_no}>
                                            <tr>
                                                {/* <td style={{ textAlign: 'center' }}>
                                                    <Box display="flex" alignItems="center">
                                                        <textarea
                                                            rows="2"
                                                            value={actionDescs[request.id] || ''}
                                                            onChange={(e) => handleDescChange(request.order_no, e.target.value)}
                                                            style={{ width: '100%', resize: 'none' }}
                                                        />
                                                        <Box>
                                                            <Button onClick={() => handleAccept(request.order_no)} color="success" size="small"><CheckIcon /></Button>
                                                            <Button onClick={() => handleReject(request.order_no)} color="error" size="small"><CloseIcon /></Button>
                                                        </Box>
                                                    </Box>
                                                </td> */}
                                                <td style={{ textAlign: 'center' }}>
                                                    <Button onClick={() => handleAccept(request.complaint_id)} color="success"><CheckIcon /></Button>
                                                    <Button onClick={() => handleReject(request.complaint_id)} color="error"><CloseIcon /></Button>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>{request.user_id}</td>
                                                <td style={{ textAlign: 'center' }}>{request.order_no}</td>
                                                <td style={{ textAlign: 'center' }}>{request.session + " " + request.session_year}</td>
                                                <td style={{ textAlign: 'center' }}>{request.amount}</td>
                                                <td style={{ textAlign: 'center' }}>{request.date_of_payment}</td>
                                                <td style={{ textAlign: 'center' }}>{(request.created_at + "").slice(0, 10)}</td>
                                                {showMore && (
                                                    <>
                                                        <td style={{ textAlign: 'center' }}>{request.remark}</td>
                                                        <td style={{ textAlign: 'center' }}>{request.pay_code}</td>
                                                        <td style={{ textAlign: 'center' }}>{request.payment_gateway}</td>
                                                        <td style={{ textAlign: 'center' }}>{request.branch}</td>
                                                    </>
                                                )}
                                            </tr>
                                            <tr>
                                                <td colSpan={showMore ? 11 : 4}>
                                                    <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            {/* Additional details to be displayed when row is expanded */}
                                                            <Typography variant="body2">
                                                                Description: {request.description}
                                                            </Typography>
                                                            {/* Add more fields here */}
                                                        </Box>
                                                    </Collapse>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button onClick={handleShowMore} variant="outlined">{showMore ? 'Show Less' : 'Show More'}</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
export default AdminReq;
