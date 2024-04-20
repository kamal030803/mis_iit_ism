// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useAuth } from 'src/hooks/useAuth'
import Student from './components/student'
import Employee from './components/employee'
const Home = () => {
  const { userAuths } = useAuth()

  return (

    <Grid container spacing={6}>
      {

        (userAuths.includes('emp')) ?
          (
            <Grid item xs={12}>
              <Employee />
            </Grid>
          )
          :
          (
            <Grid item xs={12}>
              <Student />
            </Grid>
          )

      }

    </Grid>
  )
}

export default Home
