import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Post, Get } from 'src/configs/Reqmethod';
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import Badge from '@mui/material/Badge'
import Pagination from '@mui/material/Pagination'
import IconButton from '@mui/material/IconButton'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import authConfig from 'src/configs/auth'
const url = process.env.APIURL;
const Index = () => {

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
                paddingRight: theme.spacing(24)
            },
            '& .MuiListItemText-root': {
                marginTop: 0,
                '& .MuiTypography-root': {
                    fontWeight: 500
                }
            }
        }
    }))

    const [value, setValue] = useState('1')
    const [readnotifications, setReadnotifications] = useState({});
    const [readnotificationscnt, setReadnotificationscnt] = useState(0);
    const [readnotificationsPagecnt, setReadnotificationsPagecnt] = useState(1);
    const [readloader, setReadloader] = useState(false);

    const [unreadnotifications, setunReadnotifications] = useState({});
    const [unreadnotificationscnt, setunReadnotificationscnt] = useState(0);
    const [unreadnotificationsPagecnt, setunReadnotificationsPagecnt] = useState(0);
    const [unreadloader, setunReadloader] = useState(false);
    const [page, setPage] = useState(1)


    const Handleclick = async (value) => {
        const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
        setunReadloader(true);
        await axios
            .post(url + 'mark-read-notification', { 'id': value }, {
                headers: {
                    Authorization: 'Bearer ' + storedToken
                }
            }).then(async response => {
                setunReadloader(false);
                //  console.log(response.data.data.notifications)
                if (response.data.status === true) {
                    //   console.log(response.data)
                    toast.success(response.data.message)
                    //  notification = response.data.data.notifications;
                    // setunReadnotifications(response.data.data.notifications);
                    // setunReadnotificationscnt(response.data.data.unreadcount)


                    setunReadnotifications(response.data.data.notifications.data)
                    setunReadnotificationscnt(response.data.data.notifications.total);
                    setunReadnotificationsPagecnt(response.data.data.notifications.last_page)
                    const read = await Get('get-read-notification?page=' + 1);
                    //  console.log(read);
                    if (read.status === true) {
                        setReadnotifications(read.data.notifications.data);
                        setReadnotificationscnt(read.data.notifications.total);
                        setReadnotificationsPagecnt(read.data.notifications.last_page);
                    } else {
                        setReadnotifications({})
                    }
                } else {
                    setunReadloader(false);
                }


            }).catch(err => {
                setunReadloader(false);
                console.log(err)
                // if (errorCallback) errorCallback(err)
            })

        //  setChecked(newChecked)
    }
    useEffect(() => {
        (async () => {
            setunReadloader(true)
            const unread = await Get('get-unread-notification?page=' + 1);

            if (unread.status === true) {
                setunReadnotifications(unread.data.notifications.data)
                setunReadnotificationscnt(unread.data.notifications.total);
                setunReadnotificationsPagecnt(unread.data.notifications.last_page)
                setunReadloader(false)
            } else {
                setunReadloader(false)
            }


            const read = await Get('get-read-notification?page=' + 1);
            //  console.log(read);
            if (read.status === true) {
                setReadnotifications(read.data.notifications.data);
                setReadnotificationscnt(read.data.notifications.total);
                setReadnotificationsPagecnt(read.data.notifications.last_page);
            } else {
                setReadnotifications({})
            }



        })();

    }, [])

    const handleTabsChange = async (event, newValue) => {
        setValue(newValue)
        if (newValue === "1") {
            setunReadloader(true)
            const unread = await Get('get-unread-notification?page=' + 1);
            if (unread.status === true) {
                setunReadnotifications(unread.data.notifications.data)
                setunReadnotificationscnt(unread.data.notifications.total);
                setunReadnotificationsPagecnt(unread.data.notifications.last_page)
                setunReadloader(false)
            } else {
                setunReadloader(false)
            }

            //  console.log(unreadnotifications);
            //  setReadnotifications(unread)
        } else {

            setReadloader(true)
            const read = await Get('get-read-notification?page=' + 1);
            //  console.log(read);
            if (read.status === true) {
                setReadnotifications(read.data.notifications.data);
                setReadnotificationscnt(read.data.notifications.total);
                setReadnotificationsPagecnt(read.data.notifications.last_page);
                setReadloader(false)
            } else {
                setReadnotifications({})
                setReadloader(false)
            }
            //   console.log(readnotifications);
        }


    }
    const handlePageChangeUnread = async (event, value) => {
        //    console.log(value);
        setunReadloader(true)
        const unread = await Get('get-unread-notification?page=' + value);
        setunReadnotifications(unread.data.notifications.data)
        setunReadnotificationscnt(unread.data.notifications.total);
        setunReadnotificationsPagecnt(unread.data.notifications.last_page)
        setunReadloader(false)
        setPage(value)
    }
    const handlePageChangeread = async (event, value) => {
        //    console.log(value);
        setunReadloader(true)
        const unread = await Get('get-read-notification?page=' + value);
        setReadnotifications(unread.data.notifications.data);
        setReadnotificationscnt(unread.data.notifications.total);
        setReadnotificationsPagecnt(unread.data.notifications.last_page);
        setReadloader(false)
        setPage(value)
    }
    let r = 0;
    return (
        <Card>
            <CardHeader title='Notifications' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(8)} !important` }}>

                    <TabContext value={value}>
                        <TabList key={2}
                            variant='scrollable'
                            //  scrollButtons={false}
                            onChange={handleTabsChange}

                            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
                        >
                            <Tab value='1' label='Unread Notifications' icon={<Badge sx={{ paddingRight: '15px' }} badgeContent={unreadnotificationscnt} color='primary'>

                            </Badge>} iconPosition="end" />
                            <Tab value='2' label='Read Notifications' icon={<Badge sx={{ paddingRight: '15px' }} badgeContent={readnotificationscnt} color='primary'>

                            </Badge>} iconPosition="end" />

                        </TabList>
                        <TabPanel value='1'>
                            {(unreadloader == true) ? <Stack alignItems="center">
                                <CircularProgress />
                            </Stack> : ''
                            }

                            <Grid item xs={12} sm={6}>
                                <StyledList disablePadding>
                                    <List>

                                        {unreadnotifications.length > 0 ? unreadnotifications.map((i, index) => {
                                            r++;
                                            return (<ListItemButton key={index}> <ListItemAvatar>
                                                <Avatar alt={i.from_name} src={(i.photopath) ? process.env.ImageUrl + i.photopath : '/images/avatars/1.png'} sx={{ height: 32, width: 32 }} />
                                            </ListItemAvatar>
                                                <ListItemText key={i.id} primary={i.notice_title} secondary={i.id + i.description} />
                                                <ListItemSecondaryAction>
                                                    <IconButton color='inherit' title='Marked as read' aria-haspopup='true' onClick={() => {
                                                        Handleclick(i.id)
                                                    }} aria-controls='customized-menu'>
                                                        <MarkEmailReadIcon color='primary' />
                                                    </IconButton>
                                                </ListItemSecondaryAction>

                                            </ListItemButton>

                                            )


                                        }) : <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Typography variant='caption' sx={{ textAlign: 'center', justifyContent: 'center' }}>
                                            You all clear 👋🏻
                                        </Typography></Box>}

                                    </List>
                                    <Pagination page={page} showFirstButton showLastButton onChange={handlePageChangeUnread} count={unreadnotificationsPagecnt} shape='rounded' color='primary' />
                                </StyledList>
                            </Grid>

                        </TabPanel>
                        <TabPanel value='2'>
                            {(readloader == true) ? <Stack alignItems="center">
                                <CircularProgress />
                            </Stack> : ''
                            }
                            <Grid item xs={12} sm={6}>
                                <List>

                                    {readnotifications.length > 0 ? readnotifications.map((i, index) => {

                                        return (<ListItemButton key={index}> <ListItemAvatar>
                                            <Avatar alt={i.from_name} src={(i.photopath) ? process.env.ImageUrl + i.photopath : '/images/avatars/1.png'} sx={{ height: 32, width: 32 }} />
                                        </ListItemAvatar>
                                            <ListItemText id='checkbox-list-label-0' primary={i.notice_title} secondary={i.description} />
                                            <ListItemSecondaryAction>
                                                {/* <Checkbox
                                                    edge='end'
                                                    tabIndex={-1}
                                                    disableRipple
                                                    onChange={handleToggle(0)}
                                                    checked={checked.indexOf(0) !== -1}
                                                    inputProps={{ 'aria-labelledby': 'checkbox-list-label-0' }}
                                                /> */}
                                            </ListItemSecondaryAction></ListItemButton>)


                                    }) : <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Typography variant='caption' sx={{ textAlign: 'center', justifyContent: 'center' }}>
                                        You all clear 👋🏻
                                    </Typography></Box>}

                                </List>
                                <Pagination page={page} showFirstButton showLastButton onChange={handlePageChangeread} count={readnotificationsPagecnt} shape='rounded' color='primary' />
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    )
}
export default Index;