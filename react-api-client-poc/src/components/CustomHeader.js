import { Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
const CustomHeader = ({logoutAction}) => {

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            
                <Navbar.Brand href="#home">Documents dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">                        
                        <NavDropdown title="Actions" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.3" onClick={() => logoutAction()}>Logout</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" >About</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            
        </Navbar>

    );

}

export default CustomHeader;