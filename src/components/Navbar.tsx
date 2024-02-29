import styled from "styled-components";
import Link from "next/link";
// import { ChangeRootFunction, PageRoot } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHome,
  faShip,
} from "@fortawesome/free-solid-svg-icons";

const NavContainer = styled.div(() => ({
  position: "sticky",
  top: "0",
  zIndex: "1000",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "end",
  backgroundColor: "#0066cc",
  boxShadow: "0 1px 3px 1px rgba(0, 0, 0, 0.3)",
  margin: "0",
}));

const NavTitle = styled.div(() => ({
  display: "flex",
  gap: "10px",
  marginLeft: "none",
}));

const NavItem = styled.div(() => ({
  display: "flex",
  gap: "10px",
  marginLeft: "auto",
}));

const Item = styled.h3(() => ({
  cursor: "pointer",
  fontSize: "1em",
  margin: "1em",
  padding: "0.25em 1em",
}));

const Navbar = (): JSX.Element => {
  //   const handleOnClick = (event: React.MouseEvent<HTMLHeadingElement>): void => {
  //     const target = event.target as HTMLInputElement;
  //     handleChangeRoot(target.innerText as PageRoot);
  //   };
  return (
    <NavContainer>
      <NavTitle>
        <Item style={{ color: "white" }}>
          <FontAwesomeIcon icon={faShip}></FontAwesomeIcon>SJA's Shop
        </Item>
      </NavTitle>
      <NavItem>
        <Item>
          <Link href="/" style={{ color: "white", textDecoration: "inherit" }}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </Item>
        <Item>
          <Link
            href="/cart"
            style={{ color: "white", textDecoration: "inherit" }}
          >
            <FontAwesomeIcon icon={faCartShopping} /> Cart
          </Link>
        </Item>
      </NavItem>
    </NavContainer>
  );
};

export default Navbar;
