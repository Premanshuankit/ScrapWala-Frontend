import { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box } from "@mui/material";

function LoginModal({ open, handleClose }) {
    const [loginUser, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ identifier: "", pwd: "" });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};

      if (!formData.identifier) {
        newErrors.identifier = "Username / Email / Mobile is required";
      }

      if (!formData.pwd) {
        newErrors.pwd = "Password is required";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const response = await loginUser(formData).unwrap();

        console.log("Login Success:", response);
        dispatch(
          setCredentials({
            accessToken: response.accessToken,
            user: response.user
          })
        );

        handleClose();
      } catch (err) {
        console.error(err);

        setErrors({
          identifier: "Invalid identifier",
          pwd: "Invalid password",
        });
      }
    };

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 },
        }} >
      <DialogTitle sx={{ fontWeight: 600 }}>
        Login
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Enter your username, email, or mobile
            </Typography>

            <TextField
              fullWidth
              label="Username / Email / Mobile"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              error={Boolean(errors.identifier)}
              helperText={errors.identifier}
            />
          </Box>

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="pwd"
            value={formData.password}
            onChange={handleChange}
            required
            error={Boolean(errors.pwd)}
            helperText={errors.pwd}
            inputProps={{ minLength: 6 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              backgroundColor: "#b15d5dff",
              color: "#fff",
              px: 3,
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default LoginModal;