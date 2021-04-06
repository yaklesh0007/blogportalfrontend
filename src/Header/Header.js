
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
  Input,
   Modal, ModalHeader, ModalBody, ModalFooter ,ListGroup,Container,Row,Col
  
} from 'reactstrap';
import {Link} from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import InfoIcon from '@material-ui/icons/Info';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from 'axios';
const Header = (props) => {
  const {
    className
  } = props;
  const [Search,setSearch] =useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const toggle1 = () => setModal(!modal);
  
  const [postDetails,setpostDetails]=useState([])
  const fetchblog=(query)=>{
    setSearch(query)
    console.log(setSearch)
    axios.get('http://localhost:90/search/'+query)
    .then(result=>{
        setpostDetails(result.data.blog)

        console.log(postDetails)
    })
    .catch(err=>{
      console.log(err)
    })

  }

  const logout=()=> log(
    localStorage.removeItem('token'),
    window.location.href='/reg'
  )
  if(localStorage.getItem('token') && localStorage.getItem('userType')==='admin')
  {
    var menu=
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand to="/"><ViewHeadlineIcon/>Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/" activeClassName="navbar__link--active"
              active={window.location.pathname === '/'}><HomeIcon/>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact" activeClassName="navbar__link--active"
              active={window.location.pathname === '/contact'}><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addblog" activeClassName="navbar__link--active"
              active={window.location.pathname === '/addblog'}><PostAddIcon/>Add blog</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/showprofile" activeClassName="navbar__link--active"
                active={window.location.pathname === '/showprofile'}>
                  Show profile <AccountCircleIcon className="ml-2"/>
                </DropdownItem>
                <DropdownItem activeClassName="navbar__link--active" href="/showmypost"
                active={window.location.pathname === '/showmypost'}
                >
                  Show your blog <BookIcon className="ml-2"></BookIcon>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  Logout <ExitToAppIcon className="ml-2"/>
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
                placeholder="Click For Search"
                className="mt-4"
                onClick={toggle1}/>
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
              <NavLink href="/" activeClassName="navbar__link--active"
              active={window.location.pathname === '/'}><HomeIcon/>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact" activeClassName="navbar__link--active"
              active={window.location.pathname === '/contact'}><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addblog" activeClassName="navbar__link--active"
              active={window.location.pathname === '/addblog'}><PostAddIcon/>Add blog</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/showprofile" activeClassName="navbar__link--active"
                active={window.location.pathname === '/showprofile'}>
                  Show profile <AccountCircleIcon className="ml-2"/>
                </DropdownItem>
                <DropdownItem activeClassName="navbar__link--active" href='/showmypost'
                active={window.location.pathname === '/showmypost'}>
                  Show your blog <BookIcon className="ml-2"></BookIcon>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                  Logout<ExitToAppIcon className="ml-2"/>
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
                onClick={toggle1}
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
              <NavLink href="/" activeClassName="navbar__link--active"
              active={window.location.pathname === '/'}><HomeIcon></HomeIcon>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact" activeClassName="navbar__link--active"
              active={window.location.pathname === '/contact'}><PhoneIcon/>Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about" activeClassName="navbar__link--active"
              active={window.location.pathname === '/about'}><InfoIcon/>About Us</NavLink>
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
                onClick={toggle1}/>
         </FormGroup>
          </Form>
          <Button color="success" className="ml-4" href="/login" 
          active={window.location.pathname === '/login'}><LockOpenIcon></LockOpenIcon>Login</Button>
          <Button color="success" className="ml-4" href="/reg"
          active={window.location.pathname === '/reg'}><PersonAddIcon/>Register</Button>
        </Collapse>
      </Navbar>
      </div>

      
  }
  return (
    <div>
    <div className="sticky-top">
      {
        menu
      }
    </div>
    <div>
        <Modal isOpen={modal} toggle={toggle1} className={className}>
            <ModalHeader toggle={toggle1}>
            
            </ModalHeader>
            <ModalBody>
            <Input type="text" 
            value={Search}
            onChange=
            {(e)=>fetchblog(e.target.value)}
              ></Input>
              <ListGroup className="mt-2">
              {postDetails.map((item)=>{
                return(
                  <Container>
                  <Row>
                    <Col>{item.title}</Col>
                    <Col>{item.description}</Col>

                    <Col><Link to={'/addcomment/'+item._id} className="btn btn-primary"><ArrowRightAltIcon/></Link></Col>
                  </Row>
                  {/* <ListGroupItem className="justify-content-between" href={'/addcomment/'+item._id}>
                {item.title} <Badge pill>{item.description}</Badge></ListGroupItem> */}
                </Container>
                  
               
                )
              })}
    </ListGroup>
            </ModalBody>
            <ModalFooter>
              
              <Button color="danger" onClick={toggle1}>Cancel</Button>
            </ModalFooter>
          </Modal>
          </div>
    </div>
  );
}

export default Header;
