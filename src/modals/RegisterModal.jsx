import { useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Typography, Divider, 
    FormControlLabel, Checkbox, Box } from "@mui/material";

function RegisterModal({ open, handleClose }) {
    
    const [registerUser, { isLoading }] = useRegisterMutation();
    const [errors, setErrors] = useState({});
    const [hide, setHide] = useState(true)

    const [formData, setFormData] = useState({
    user: "",
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    pwd: "",
    address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
    },
    roles: ["Seller"],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.user) {
            newErrors.user = "Username is required";
        } else if (formData.user.length < 3) {
            newErrors.user = "Username must be at least 3 characters";
        } else if (formData.user.length > 50) {
            newErrors.user = "Username cannot exceed 50 characters";
        }
            
        if (!formData.mobile) {
            newErrors.mobile = "Mobile is required";
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile must be exactly 10 digits";
        }
            
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.pwd) newErrors.pwd = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            ...formData,
            roles:
            formData.roles.length === 0
                ? ["Seller"]
                : formData.roles,
        };

        try {
            const response = await registerUser(payload).unwrap();

            console.log("Registered:", response);

            handleClose(); // close modal
        } catch (err) {
            console.error(err);

            if (err?.data?.message?.includes("username")) {
                setErrors((prev) => ({
                    ...prev,
                    user: "Username already exists",
                }));
            }

            if (err?.data?.message?.includes("email")) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Email already exists",
                }));
            }

            if (err?.data?.message?.includes("mobile")) {
                setErrors((prev) => ({
                    ...prev,
                    mobile: "Mobile already exists",
                }));
            }
        }
    };

    const handleRoleChange = (role) => {
        setFormData((prev) => {
            const exists = prev.roles.includes(role);
            return {
                ...prev,
                roles: exists
                ? prev.roles.filter((r) => r !== role)
                : [...prev.roles, role],
            };
        });
    };

    const hidePassword = () => {
        setHide((prev) => !prev);
    };

    const handleChange = (e) => {
        
        const { name, value } = e.target;

        if (name in formData.address) {
            setFormData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
            }));
        } else {
            setFormData((prev) => ({
            ...prev,
            [name]: value,
            }));
        }

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                p: 1,
                },
            }}
            >
            <DialogTitle sx={{ fontWeight: 600 }}>Create Account</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Basic Information
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Username" name="user" value={formData.user} error={Boolean(errors.user)}
                                helperText={errors.user} required onChange={handleChange} inputProps={{ minLength:3, maxLength:50}}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} error={Boolean(errors.mobile)}
                                helperText={errors.mobile} required onChange={handleChange} 
                                inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]{10}"}}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="First Name" type="text" name="fname" required onChange={handleChange}
                                inputProps = {{ minLength:2}}/>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Last Name" type="text" name="lname" required onChange={handleChange}
                                inputProps = {{ minLength:2}} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" type="email" value={formData.email} error={Boolean(errors.email)}
                                helperText={errors.email} name="email" required onChange={handleChange}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="Password" type={hide ? "password" : "text"} name="pwd" required 
                                onChange={handleChange}
                                inputProps={{ minLength:6, maxLength:15}} />

                                <p style={{ margin: '0px', fontSize: '12px'}} onClick={hidePassword}>
                                    {hide ? "Show Password" : "Hide Password"} </p>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Address Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Street"
                            name="street"
                            required
                            onChange={handleChange}
                        />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            required
                            onChange={handleChange}
                        />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            required
                            onChange={handleChange}
                        />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            required
                            onChange={handleChange}
                        />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Are you a Shopkeeper (optional) ?
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={formData.roles.includes("Buyer")}
                            onChange={() => handleRoleChange("Buyer")}
                            />
                        }
                        label="Shopkeeper"
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="inherit">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isLoading}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: "#b15d5dff",
                            color: "#fff",
                            px: 3,
                        }}>
                        {isLoading ? "Registering..." : "Register"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default RegisterModal;
