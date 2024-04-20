import { useEffect, useState } from 'react'
import axios from 'axios'
import { Fragment } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


import MenuIcon from 'mdi-material-ui/Menu'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'


import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import Avatar from '@mui/material/Avatar'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import ShortcutsDropdown from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'
import { useAuth } from 'src/hooks/useAuth'
import { useTheme } from '@mui/material/styles'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
const AppBarContent = props => {
  // ** Props

  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const { useSession, useSessionYear, user } = useAuth()

  const [notifications, setNotifications] = useState([])
  const [notificationsCnt, setNotificationsCnt] = useState(0)
  const url = process.env.APIURL;


  useEffect(() => {
    (async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        await axios
          .get(url + 'get-unread-notification?page=' + 1, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {

            if (response.data.status === true) {
              //  console.log(response.data.data.notifications);
              setNotifications(response.data.data.notifications.data);
              setNotificationsCnt(response.data.data.notifications.total);
              //  console.log(notifications);
            } else {


            }

          }).catch(() => {

          })
      } else {

      }
    })();

  }, [])

  const theme = useTheme()

  const options = {
    broadcaster: 'pusher',
    key: authConfig.pusher_key,//config.pusher.key,
    cluster: authConfig.pusher_cluster,//config.pusher.cluster,
    forceTLS: false,//config.pusher.tls,   
    authEndpoint: url + 'broadcasting/auth',//config.pusher.authEndpoint, 
    wsPort: 6001,
    wssPort: 6001,
    disableStats: false,
    wsHost: window.location.hostname,
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: 'Bearer ' + storedToken,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    },
  };

  useEffect(() => {
    const echo = new Echo(options);
  //  console.log(echo)
    echo.private(`App.Models.User.${user[0].id}`)
      .notification((notification) => {
          console.log(notification)
        setNotifications(notification.notifications.data);
        setNotificationsCnt(notification.notifications.total);
        toast(
          t => (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt='ISM' src={(notification.data.photopath) ? process.env.ImageUrl + notification.data.photopath : '/images/avatars/1.png'} sx={{ mr: 3, width: 40, height: 40 }} />
                <div>
                  <Typography style={{ fontWeight: '500', fontSize: 'initial' }}>{notification.data.notice_title}</Typography>
                  <Typography style={{ color: 'black' }} variant='caption'>{notification.data.description}</Typography>
                </div>
              </Box>
              <IconButton onClick={() => toast.dismiss(t.id)}>
                <Icon icon='mdi:close' fontSize={"20"} />
              </IconButton>
            </Box>
          ),
          {
            style: {
              minWidth: '300px',
              padding: '16px',
              color: theme.palette.primary.main,
              border: '1px solid {theme.palette.primary.main}'
            },
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          }
        )

      });

  }, []);

  const shortcuts = [
    {
      title: 'Calendar',
      url: '/apps/calendar',
      subtitle: 'Appointments',
      icon: 'mdi:calendar-month-outline'
    },
    {
      title: 'Invoice App',
      url: '/apps/invoice/list',
      subtitle: 'Manage Accounts',
      icon: 'mdi:receipt-text-outline'
    },
    {
      title: 'Users',
      url: '/apps/user/list',
      subtitle: 'Manage Users',
      icon: 'mdi:account-outline'
    },

    {
      url: '/notifications',
      title: 'Dashboard',
      icon: 'mdi:chart-pie',
      subtitle: 'User Dashboard'
    }
  ]

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}

        <Fragment>

          <Typography sx={{ fontWeight: 500 }}></Typography>
          <div className='demo-space-x'>
            <Chip label={'Academic Session : '+ useSessionYear[0].session_year } color='primary' />

          </div>
        </Fragment>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
        <NotificationDropdown settings={settings} notification={notifications} notificationsCnt={notificationsCnt} />

        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
