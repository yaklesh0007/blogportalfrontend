
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
 
  Input
  
} from 'reactstrap';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sticky-top navigation">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addblog">Add blog</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Show profile
                </DropdownItem>
                <DropdownItem>
                  Show your blog
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Form>
          <FormGroup>
              
              <Input
                type="search"
                name="search"
                id="exampleSearch"
                placeholder="search"
                className="mt-4"
              />
         </FormGroup>
          </Form>
          <Button color="success" className="ml-4" href="/login">Login</Button>
          <Button color="success" className="ml-4" href="/reg">Register</Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
