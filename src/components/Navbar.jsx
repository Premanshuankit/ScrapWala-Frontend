import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Badge , Avatar, IconButton, Menu, MenuItem, Divider} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { NavLink } from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";
import { useGetMySellRequestsQuery } from "../features/seller/sellerApi";
import { useGetIncomingRequestsQuery } from "../features/transaction/transactionApi";

function Navbar() {

    const [openRegister, setOpenRegister] = useState(false)
    const [openLogin, setopenLogin] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const roles = user?.roles || {};
    const isBuyer = !!roles.Buyer;
    const isSeller = !!roles.Seller;
    const [logout] = useLogoutMutation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (err) {
            console.error("Logout failed :", err);
        } finally {
            dispatch(clearCredentials());
            navigate("/");
        }
    };

    const { data: requests = [] } = useGetMySellRequestsQuery(undefined, {
        skip: !isSeller,
    });

    const { data: incomingRequests = [] } = useGetIncomingRequestsQuery(undefined, {
        skip: !isBuyer,
    });

    const activeNav = {
        "&.active": {
            fontWeight: 700,
            borderBottom: "2px solid cyan",
        },
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#b15d5dff", color: "#fff"}}>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, 
                    cursor: "pointer",
                    "& *": {
                    cursor: "pointer",
                    }, }} onClick = {() => navigate('/')}>

                    <RecyclingIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                        Scrap Management
                    </Typography>
                </Box>

                <Box>
                    {user ? (
                        <>
                        {/* <Button color="inherit" to='/'  end
                            component={NavLink}
                            sx={activeNav}>
                            Hello , {user?.username || "User"}
                        </Button>

                        <Button color="inherit" onClick={handleLogout} >
                            Logout
                        </Button> */}
                        </>
                        ) : (
                        <>
                        <Button color="inherit" onClick={() => setopenLogin(true)}>
                            Login
                        </Button>

                        <Button color="inherit" onClick={() => setOpenRegister(true)}>
                            Register
                        </Button>
                        </>
                    )}

                    {/* If Buyer → show Listing */}
                    {isBuyer && (
                        <>
                            <Button color="inherit" component={NavLink} to="/listing" 
                                sx={activeNav}>
                                Listing
                            </Button>
                            {/* {isBuyer && ( */}
                                <Badge
                                    badgeContent={incomingRequests.length}
                                    color="error"
                                    overlap="rectangular"
                                    sx={{
                                    "& .MuiBadge-badge": {
                                            top: -8,
                                            right: "20%",
                                            transform: "translateX(50%)",
                                        },
                                    }}
                                >
                                    <Button color="inherit" component={NavLink} to="/seller/incoming" 
                                        sx={activeNav}>
                                    Dashboard
                                    </Button>
                                </Badge>
                            {/* )} */}
                        </>                        
                    )}

                    {/* If User → show Sell Items */}
                    
                        {user && (
                         <>
                            <Button color="inherit" component={NavLink} to="/seller" end
                                sx={activeNav}>
                                Sell Items
                            </Button>

                            {/* {isSeller && ( */}
                                <Badge badgeContent={requests?.length || 0} color="error"
                                    sx={{
                                        "& .MuiBadge-badge": {
                                                top: -8,
                                                right: "20%",
                                                transform: "translateX(50%)",
                                            },
                                    }}>
                                    <Button component={NavLink} to="/seller/requests" color="inherit" 
                                        sx={activeNav}>
                                        My Requests
                                    </Button>
                                </Badge>
                            {/* )} */}
                        </>

                        
                    )}

                    { user && (
                        <>
                            <IconButton onClick={handleClick}>
                                <Avatar sx={{ bgcolor: "#c49a6c", width: 36, height: 36 }}>
                                </Avatar>
                            </IconButton>
                    
                    
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                >
                                <MenuItem color="inherit" to='/'
                                    component={NavLink}
                                    sx={activeNav}>
                                    {user?.username || "User"}
                                </MenuItem>

                                { isBuyer && (
                                    <MenuItem color="inherit" to='/inventory'
                                        component={NavLink}
                                        sx={activeNav}>
                                        Inventory
                                    </MenuItem>
                                )}

                                <Divider />
                                
                                <MenuItem color="inherit" onClick={handleLogout} >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
            </AppBar>

            <LoginModal
                open={openLogin}
                handleClose={() => setopenLogin(false)}
            />

            <RegisterModal
                open={openRegister}
                handleClose={() => setOpenRegister(false)}
            />
        </>  
    );
}

export default Navbar;