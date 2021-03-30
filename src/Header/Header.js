
import React, { useState ,log} from 'react';
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
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout=()=> log(
    localStorage.removeItem('token'),
    window.location.href='/reg'
  )
  if(localStorage.getItem('token') && localStorage.getItem('userType')==='admin')
  {
    var menu=
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><ViewHeadlineIcon/>Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/"><HomeIcon/>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact"><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addblog">Add blog</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/showprofile">
                  Show profile <AccountCircleIcon/>
                </DropdownItem>
                <DropdownItem>
                  Show your blog
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  Logout <ExitToAppIcon/>
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
          
        </Collapse>
      </Navbar>
    </div>
  }
  else if(localStorage.getItem('token') && localStorage.getItem('userType')==='normaluser'){
    var menu=
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><ViewHeadlineIcon/>Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/"><HomeIcon/>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact"><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addblog">Add blog</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/showprofile">
                  Show profile <AccountCircleIcon/>
                </DropdownItem>
                <DropdownItem>
                  Show your blog
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  Logout<ExitToAppIcon/>
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
          
        </Collapse>
      </Navbar>
    </div>
  }
  else{
      var menu=
      <div>
         <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><ViewHeadlineIcon/>Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/"><HomeIcon></HomeIcon>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact"><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            
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
          <Button color="success" className="ml-4" href="/login"><LockOpenIcon></LockOpenIcon>Login</Button>
          <Button color="success" className="ml-4" href="/reg"><PersonAddIcon/>Register</Button>
        </Collapse>
      </Navbar>
      </div>

      
  }
  return (
    <div className="sticky-top navigation">
      {
        menu
      }
    </div>
  );
}

export default Header;
