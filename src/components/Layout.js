import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from 'react-router-dom'
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import { AppContext } from "../modules/context";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const BarContainer = styled.div`
  flex-basis: 60;
  display: flex;
`;
const SideMenuContainer = styled.div`
  flex-basis: 180px;
  border-right: 1px solid #eee;
`;
const ContentContainer = styled.div`
  flex: 1;
  background-color: #f5f5f5;
`;

//flexGrow: 1,

const Title = styled(Typography)`
  flex-grow: 1;
`;



function Layout({ children }) {

  return (
    <Container>
      <Header />
      <div style={{ flex: 1, display: "flex" }}>
        <SideMenu />
        <ContentContainer>{children}</ContentContainer>
      </div>
    </Container>
  );
}

function Header() {

  const { data: dataContext } = useContext(AppContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BarContainer>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Title variant="h6">LavanReact</Title>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Typography> {dataContext?.state?.usuario?.username} </Typography>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => dataContext?.setState(null)}>Sair</MenuItem>
            </Menu>
          </div>

        </Toolbar>
      </AppBar>
    </BarContainer>
  );
}

function SideMenu() {

  const history = useHistory();
  return (
    <SideMenuContainer>
      <List component="nav">
        <ListSubheader>Menu</ListSubheader>
        <ListItem button onClick={() => history.push("/admin/")}>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button onClick={() => history.push("/admin/servicos")}>
          <ListItemText primary="Serviços" />
        </ListItem>
      </List>
    </SideMenuContainer>
  );
}
export default Layout;
