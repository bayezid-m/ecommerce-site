
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';

export default function NavBar({check, change}: {check: any; change: any}) {
    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width:'100%'}}>
            <AppBar position="static" sx={{backgroundColor:"primary.main"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                       AliDuxx
                    </Typography>
                    <Switch
                        checked={check}
                        onChange={change}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}