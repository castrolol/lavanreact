import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styled from "styled-components";

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
  return (
    <BarContainer>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">LavanReact</Typography>
        </Toolbar>
      </AppBar>
    </BarContainer>
  );
}

function SideMenu() {
  return (
    <SideMenuContainer>
      <List component="nav">
        <ListSubheader>Menu</ListSubheader>
        <ListItem button>
          <ListItemText primary="Serviços" />
        </ListItem>
      </List>
    </SideMenuContainer>
  );
}
export default Layout;
