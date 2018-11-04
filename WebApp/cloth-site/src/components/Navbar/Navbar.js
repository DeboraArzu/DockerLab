import React from 'react';
import './Navbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { NavLink } from 'react-router-dom';

const navbar = props => (
    <header className="navbar">
        <nav className="navbar-navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="navbar-logo">
                <NavLink to="/home">Home</NavLink>
            </div>
            <div className="space" />
            <div className="navbar-navigation-items">
            </div>
        </nav>
    </header>
);

export default navbar;