import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { Link } from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCredentials } from "../features/auth/authSlice";

function Navbar() {

    const [openRegister, setOpenRegister] = useState(false)
    const [openLogin, setopenLogin] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const roles = user?.roles || {};
    const isBuyer = !!roles.Buyer;
    const isSeller = !!roles.Seller;

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate("/");
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
                        <Button color="inherit" onClick={() => navigate('/')}>
                            Hello , {user?.username || "User"}
                        </Button>

                        <Button color="inherit" onClick={() => dispatch(handleLogout)} >
                            Logout
                        </Button>
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

                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>

                    {/* If Buyer → show Listing */}
                    {isBuyer && (
                        <Button color="inherit" component={Link} to="/listing">
                            Listing
                        </Button>
                    )}

                    {/* If Seller → show Sell Items */}
                        {isSeller && (
                        <Button color="inherit" component={Link} to="/seller">
                            Sell Items
                        </Button>
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