import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TelegramIcon from "@mui/icons-material/Telegram";
// router
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logOut } from "../../firebase/auth";

// user store
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { useDispatch } from "react-redux";

// logging
import { addLog } from "../../firebase/analytics.ts";

interface NavItem {
  title: string;
  to: string;
}

const pages: NavItem[] = [
  // { title: "Companies", to: "/intern-io/companies" },
  // { title: "Open Positions", to: "/" },
  // { title: "Add company", to: "/companies/add" },
];

const telegramLink = "https://t.me/+evox5J6c7LQyN2Yy";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state: RootState) => state.user.isAuthorized,
  );

  const handleGoToPage = (to: string) => {
    navigate(to);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#455A64" }} elevation={0}>
      <Container
        maxWidth="xl"
        sx={{ maxWidth: { xs: "350px", sm: "600px", md: "1200px" } }}
      >
        <Toolbar disableGutters>
          <Button
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              handleGoToPage("/intern-io");
              addLog(`click LOGO`);
            }}
          >
            Intern.io
          </Button>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleGoToPage(page.to);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex" }, alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              onClick={() => {
                window.open(telegramLink, "_blank");
                addLog(`click Telegram link`);
              }}
              color="inherit"
            >
              {/*<Typography*/}
              {/*  variant="subtitle1"*/}
              {/*  component="div"*/}
              {/*  sx={{*/}
              {/*    flexGrow: 1,*/}
              {/*    display: { xs: "none", sm: "block" },*/}
              {/*    mr: 1,*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Official Page*/}
              {/*</Typography>*/}
              <TelegramIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" }, alignItems: "center" }}>
            {!isAuthorized ? (
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => {
                  signInWithGoogle(dispatch);
                  addLog(`click SIGN IN`);
                }}
                color="inherit"
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    mr: 1,
                  }}
                >
                  Sign In
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={() => {
                  logOut(dispatch);
                  addLog(`click SIGN OUT`);
                }}
                color="inherit"
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    mr: 1,
                  }}
                >
                  Sign Out
                </Typography>
              </IconButton>
            )}
            {/*{isAuthenticated && (*/}
            {/*  <IconButton*/}
            {/*    size="large"*/}
            {/*    aria-label="show more"*/}
            {/*    aria-haspopup="true"*/}
            {/*    onClick={logOut}*/}
            {/*    color="inherit"*/}
            {/*  >*/}
            {/*    <Typography*/}
            {/*      variant="h6"*/}
            {/*      component="div"*/}
            {/*      sx={{*/}
            {/*        flexGrow: 1,*/}
            {/*        display: { xs: "none", sm: "block" },*/}
            {/*        mr: 1,*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      Sign Out*/}
            {/*    </Typography>*/}
            {/*  </IconButton>*/}
            {/*)}*/}
          </Box>

          {/*<Box sx={{ flexGrow: 0 }}>*/}
          {/*  <Tooltip title="Open settings">*/}
          {/*    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
          {/*      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
          {/*    </IconButton>*/}
          {/*  </Tooltip>*/}
          {/*  <Menu*/}
          {/*    sx={{ mt: "45px" }}*/}
          {/*    id="menu-appbar"*/}
          {/*    anchorEl={anchorElUser}*/}
          {/*    anchorOrigin={{*/}
          {/*      vertical: "top",*/}
          {/*      horizontal: "right",*/}
          {/*    }}*/}
          {/*    keepMounted*/}
          {/*    transformOrigin={{*/}
          {/*      vertical: "top",*/}
          {/*      horizontal: "right",*/}
          {/*    }}*/}
          {/*    open={Boolean(anchorElUser)}*/}
          {/*    onClose={handleCloseUserMenu}*/}
          {/*  >*/}
          {/*    {settings.map((setting) => (*/}
          {/*      <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
          {/*        <Typography textAlign="center">{setting}</Typography>*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </Menu>*/}
          {/*</Box>*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
