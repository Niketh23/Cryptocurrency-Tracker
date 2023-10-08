import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react"; // Import React and useState from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import createUserWithEmailAndPassword from Firebase auth
import { auth } from "../../firebase"; // Import your Firebase auth instance
import { CryptoState } from "../../CryptoContext";

const Sign_up = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setAlert } = CryptoState();

  // Define the handleSubmit function with proper async syntax
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }
    try {
      // Use Firebase's createUserWithEmailAndPassword function
      const result = await createUserWithEmailAndPassword(auth, email, password);

      console.log(result);
      setAlert({
        open: true,
        message: `Sign up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open:true,
        message:error.message,
        type:"error",
      });
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />

      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <TextField
        variant="outlined"
        type="password"
        label="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        SignUp
      </Button>
    </Box>
  );
};

export default Sign_up;
