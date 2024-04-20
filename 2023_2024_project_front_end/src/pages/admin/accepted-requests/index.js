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

const AdminReq = () => {
  const [refunds, setRefunds] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const getRefundRequests = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/refund-ac/list", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // Add any additional headers or options as needed
      });
      if (res.ok) {
        const data = (await res.json()).data;
        setRefunds(data);
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
                    <th style={{ textAlign: 'center' }}>Refund Log</th>
                    <th style={{ textAlign: 'center' }}>User ID</th>
                    <th style={{ textAlign: 'center' }}>Session</th>
                    <th style={{ textAlign: 'center' }}>Accout No</th>
                    <th style={{ textAlign: 'center' }}>IFSC Code</th>
                    <th style={{ textAlign: 'center' }}>Amount</th>
                    <th style={{ textAlign: 'center' }}>Date of Request</th>
                    {showMore && (
                      <>
                        <th style={{ textAlign: 'center' }}>Date of Payment</th>
                        <th style={{ textAlign: 'center' }}>Order Id</th>
                        <th style={{ textAlign: 'center' }}>Complaint Id</th>
                        <th style={{ textAlign: 'center' }}>Remark</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {refunds && refunds.map((refund, index) => (
                    <React.Fragment key={refund.id}>
                      <tr>
                        <td style={{ textAlign: 'center' }}>{refund.id}</td>
                        <td style={{ textAlign: 'center' }}>{refund.user_id}</td>
                        <td style={{ textAlign: 'center' }}>{refund.session}</td>
                        <td style={{ textAlign: 'center' }}>{refund.account_number}</td>
                        <td style={{ textAlign: 'center' }}>{refund.ifsc_code}</td>
                        <td style={{ textAlign: 'center' }}>{refund.amount}</td>
                        <td style={{ textAlign: 'center' }}>{(refund.date_of_request).slice(0,10)}</td>
                        {showMore && (
                          <>
                            <td style={{ textAlign: 'center' }}>{(refund.date_of_payment).slice(0,10)}</td>
                            <td style={{ textAlign: 'center' }}>{refund.order_id}</td>
                            <td style={{ textAlign: 'center' }}>{refund.complaint_id}</td>
                            <td style={{ textAlign: 'center' }}>{refund.remark}</td>
                          </>
                        )}
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
