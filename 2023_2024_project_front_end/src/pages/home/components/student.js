import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Post, Get } from 'src/configs/Reqmethod';
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import List, { ListProps } from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider';

const Student = () => {
    const url = process.env.APIURL;
    const [userDetails, setUserDetails] = useState({});
    const [loader, setLoader] = useState(false);

    const StyledList = styled(List)(({ theme }) => ({
        '& .MuiListItem-container': {
            border: `1px solid ${theme.palette.divider}`,

            '&:first-of-type': {
                borderTopLeftRadius: theme.shape.borderRadius,
                borderTopRightRadius: theme.shape.borderRadius
            },
            '&:last-child': {
                borderBottomLeftRadius: theme.shape.borderRadius,
                borderBottomRightRadius: theme.shape.borderRadius
            },
            '&:not(:last-child)': {
                borderBottom: 0
            },
            '& .MuiListItem-root': {
                paddingRight: theme.spacing(15)
            },
            '& .MuiListItemText-root': {
                marginTop: 0,
                '& .MuiTypography-root': {
                    fontWeight: 500
                }
            }
        }
    }))

    const BadgeContentSpan = styled('span')(({ theme }) => ({
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: theme.palette.success.main,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
    }))

    useEffect(() => {
        setLoader(true)
        async function fetchData() {
            const read = await Post('getStudentDetails');
            //    console.log(read.data[0])
            setUserDetails(read.data.data[0])
            setLoader(false)
        }
        fetchData();
    }, []);

    return (

        <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                <Card>
                    <CardHeader title='Your Details !'></CardHeader>
                    <CardContent>
                        {loader ? (
                            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <CircularProgress sx={{ mb: 4 }} />
                                <Typography>Loading...</Typography>
                            </Box>
                        ) : (
                            <Grid container spacing={6} >
                                <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                                    <Badge
                                        // style={{ margin: '40px', position: 'center' }}
                                        overlap='circular'
                                        badgeContent={<BadgeContentSpan />}

                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar variant='rounded' sx={{ width: 150, height: 150 }} alt={userDetails.user_name} src={(userDetails.photopath) ? process.env.ImageUrl + userDetails.photopath : '/images/avatars/1.png'} />

                                    </Badge>
                                    <Divider />
                                    <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                                        <Avatar style={{ marginLeft: '68%' }} variant='rounded' sx={{ width: 250, height: 75 }} alt={userDetails.user_name} src={(userDetails.signpath) ? process.env.ImageUrl + userDetails.signpath : '/images/avatars/1.png'} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <StyledList disablePadding>
                                        <ListItem>
                                            <div>
                                                <ListItemText primary={"Admission No  : " + userDetails.id} />
                                            </div>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <div>
                                                <ListItemText primary={"Name  : " + userDetails.user_name} />
                                            </div>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <div>
                                                <ListItemText primary={"Department  : " + userDetails.dept_id} />
                                            </div>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <div>
                                                <ListItemText primary={"Email  : " + userDetails.domain_name} />
                                            </div>
                                        </ListItem>
                                    </StyledList>
                                </Grid>

                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                <Card>
                    <CardHeader title='Upcoming/Expected Events'></CardHeader>

                    <CardContent>

                        <Grid item xs={12} md={6}>
                            <Divider sx={{ m: '0 !important' }} />
                            <StyledList disablePadding>
                                <ListItem>
                                    <div>
                                        <ListItemText primary={"Comprehensive Exam  : " + 'No Information Available'} />
                                    </div>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <div>
                                        <ListItemText primary={"Research Proposal seminar  : " + 'No Information Available'} />
                                    </div>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <div>
                                        <ListItemText primary={"Pre-submission Seminar  : " + 'No Information Available'} />
                                    </div>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <div>
                                        <ListItemText primary={"Thesis Submission  : " + 'No Information Available'} />
                                    </div>
                                </ListItem>
                            </StyledList>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>



        </Grid>
    )

}
export default Student;
