import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, Slide, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import LoginPage from "./LoginPage"; 
import SignUpForm from "./SighUp";

// אנימציה לפתיחת הדיאלוג
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function PrivateRoute({ children }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'login' או 'register'
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!user) {
      setOpenLogin(true);
    }
  }, [user]);

  return (
    <>
      {children} {/* מציגים את העמוד מאחור */}
      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "white", // רקע לבן לדיאלוג
            padding: 2,
            borderRadius: 3,
          },
        }}
        TransitionComponent={Transition}
        transitionDuration={500}
      >
        <DialogTitle>
          {authMode === "login" ? "התחברות" : authMode === "register" ? "הרשמה" : "ברוך הבא!"}
        </DialogTitle>
        <DialogContent>
          {authMode === null ? (
            // תיבת בחירה בין התחברות להרשמה
            <Stack spacing={2}>
              <Button variant="contained" onClick={() => setAuthMode("login")} fullWidth>
                התחברות
              </Button>
              <Button variant="outlined" onClick={() => setAuthMode("SignUpForm")} fullWidth>
                הרשמה
              </Button>
            </Stack>
          ) : authMode === "login" ? (
            <LoginPage onClose={() => setOpenLogin(false)} />
          ) : (
            <SignUpForm onClose={() => setOpenLogin(false)} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PrivateRoute;
