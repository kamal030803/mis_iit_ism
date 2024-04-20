// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import axios from 'axios'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import toast from 'react-hot-toast'
// ** Util Import
import { getInitials } from 'src/@core/utils/get-initials'
import authConfig from 'src/configs/auth'
// import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const url = process.env.APIURL;
// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = props => {
  // ** Props
  const { settings, notification, notificationsCnt } = props

  const [userNotifications, setuserNotifications] = useState(notification)
  const [unreadnotificationscnt, setunReadnotificationscnt] = useState(0);

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const RenderAvatar = ({ notification }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification
    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else if (avatarIcon) {
      return (
        <Avatar skin='light' color={avatarColor}>
          {avatarIcon}
        </Avatar>
      )
    } else {
      return (
        <Avatar skin='light' color={avatarColor}>
          {getInitials(avatarText)}
        </Avatar>
      )
    }
  }
  const handleNotificationClose = async (id, path) => {
    //   alert(id);

    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    await axios
      .post(url + 'mark-read-notification', { 'id': id }, {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      }).then(async response => {
        //  console.log(response.data.data.notifications)
        if (response.data.status === true) {
          toast.success(response.data.message)
          //  notification = response.data.data.notifications;
          setuserNotifications(response.data.data.notifications.data);
          setunReadnotificationscnt(response.data.data.notifications.total)
        } else {
          // toast.success("okk")
        }


      }).catch(err => {
        console.log(err)
        // if (errorCallback) errorCallback(err)
      })


    //setAnchorEl(null)
  }
  useEffect(() => {
    setuserNotifications(notification);
    //  console.log(userNotifications)
    setunReadnotificationscnt(notificationsCnt)
  }, [notification])

  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <Badge
          color='error'
          variant='dot'
          invisible={!notificationsCnt}
          sx={{
            '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
          }}
        >
          <Icon icon='mdi:bell-outline' />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Notifications</Typography>
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label={unreadnotificationscnt + ' unread'}
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper hidden={hidden}>
          {userNotifications.length > 0 ? userNotifications.slice(0, 10).map((i, index) => {
            return <MenuItem key={index}> <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt={i.from_name} src={(i.photopath) ? process.env.ImageUrl + i.photopath : '/images/avatars/1.png'} />
              <Box title={i.description} key={i.id} sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle style={{ fontWeight: '500', fontSize: 'initial' }} >{i.notice_title}</MenuItemTitle>
                <MenuItemSubtitle style={{ color: 'black' }} variant='body2'>{i.description}</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'black' }}>
                {i.formated_date}
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                <IconButton color='inherit' title='Marked as read' aria-haspopup='true' onClick={() => {
                  handleNotificationClose(i.id, i.notice_path)
                }} aria-controls='customized-menu'>
                  {/* <MarkEmailReadIcon color='primary' /> */}
                  <Icon icon='mdi:email-open' />
                </IconButton>
                {/* <Chip color='primary' onDelete={handleDelete} IconButton={CheckmarkIcon} /> */}
              </Typography>
            </Box></MenuItem>
          }) : <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> <Typography variant='caption' sx={{ textAlign: 'center', justifyContent: 'center' }}>
            You all clear 👋🏻
          </Typography></Box>}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            <Link href='/notifications' style={{ textDecoration: 'none', color: '#fff' }}>
              Read All Notifications
            </Link>
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
