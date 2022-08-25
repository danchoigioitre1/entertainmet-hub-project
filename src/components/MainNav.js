import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';


import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';



export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        if (value === 0) { navigate('/') }
        else if (value === 1) { navigate('/movies') }
        else if (value === 2) { navigate('/series') }
        else if (value === 3) { navigate('/search') }


    }, [value])


    return (
        <Box sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            backgroundColor: '#2d313a',
            zIndex: 100,
        }} style={{}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Trending"
                    icon={<WhatshotIcon />}
                    style={{ color: 'black' }}
                />

                <BottomNavigationAction
                    label="Movie"
                    icon={<MovieIcon />}
                    style={{ color: 'black' }}
                />

                <BottomNavigationAction
                    label="TV series"
                    icon={<TvIcon />}
                    style={{ color: 'black' }}
                />

                <BottomNavigationAction
                    label="Search"
                    icon={<SearchIcon />}
                    style={{ color: 'black' }}
                />
            </BottomNavigation>
        </Box>
    );
}
