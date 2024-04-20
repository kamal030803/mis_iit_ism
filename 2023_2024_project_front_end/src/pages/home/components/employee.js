import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Employee = () => {
    return (

        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Thesis Management System 🚀'></CardHeader>
                    <CardContent>
                        <Typography sx={{ mb: 2 }}>Welcome to Thesis Management System (IIT(ISM)).</Typography>
                      
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )

}
export default Employee;
