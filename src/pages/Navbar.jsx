import React, { useContext } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

export default function AppNavbar() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function logout() {
    localStorage.removeItem("token");
    queryClient.clear();
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <Navbar>
      <NavbarBrand>
        <RouterLink to="/" className="font-bold text-inherit">
          Notem
        </RouterLink>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={logout} color="danger" variant="flat">
            Logout
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={() => navigate('/profile')}
            color="primary"
            variant="flat"
          >
            My Notes
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
