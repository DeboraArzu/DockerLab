import React from 'react';
import './SideDrawer.css'
import {NavLink} from 'react-router-dom';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses} >
            <ul>
                <li>
                    <NavLink to ='/Products'>Products</NavLink>
                </li>
                <li>
                    <NavLink to ='/About' activeClassName="active">About</NavLink>
                </li>

            </ul>
        </nav>
        );
};

export default sideDrawer;