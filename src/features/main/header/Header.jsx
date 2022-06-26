import React from 'react';
import "./header.css"
import Button from "@mui/material/Button";

const Header = () => {
    
    return (
        <div className={"header-container"}>
            <h3>February Promotional</h3>
            <p>Selected products with 33% discount</p>
            <Button variant="contained" className={"see-console-btn"}>See Consoles</Button>

        </div>
    );
};

export default Header;