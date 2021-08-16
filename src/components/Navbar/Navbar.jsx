import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import {Link} from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'

import logo from '../../assets/sports.png'
import useStyles from './styles'

const Navbar = ( {totalItems, categories} ) => {
    
    const classes = useStyles();
    // const location = useLocation();

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="Sports store" height="40px" className={classes.image} />
                        Sports Apparel Store
                    </Typography>

                    <div className={classes.grow} />

                    <div className={classes.category}>
                        {categories.filter((category) => {
                            if(category.name==="Men" || category.name==="Women"){
                                return category;
                            }
                            }).map((category)=>{
                                return (
                                    <div className={classes.subCategory}>
                                        <Typography component={Link} to={"/"+category.name} variant='h6' className={classes.title} color='inherit'>
                                            {category.name}
                                        </Typography>
                                    </div>

                                )
                        })}
                    </div>
                    <div className={classes.category}>
                        {categories.filter((category) => {
                            if(category.name!=="Men" &&  category.name!=="Women"){
                                return category;
                            }
                            }).map((category)=>{
                                return (
                                    <div className={classes.subCategory}>
                                        <Typography component={Link} to={"/"+category.name} variant='h6' className={classes.title} color='inherit'>
                                            {category.name}
                                        </Typography>
                                    </div>

                                )
                        })}
                    </div>

                    <div className={classes.grow} />
                    {/* <div className={classes.button}>
                        <IconButton component={Link} to="/login" color='inherit'>My Account</IconButton>
                    </div> */}

                    {/* {location.pathname==='/' ? (                 */}
                    <div className={classes.button}> 
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'></Badge>
                            <ShoppingCart />
                        </IconButton>
                    </div>
                    {/* ) : null} */}

                    {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="/Shoes">Shoes</Dropdown.Item>
                        <Dropdown.Item href="/Clothes">Clothes</Dropdown.Item>
                    </DropdownButton> */}

                </Toolbar>






            </AppBar>
        </div>
    )
}

export default Navbar
