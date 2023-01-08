import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigateTo = useNavigate();

    const pages = ['Student', 'Professor', 'Subject'];

    const handleMenuItemClick = (page) => {
        navigateTo('/' + page.toLowerCase());
    };
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container className="ms-0 me-0">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        {pages.map((page) => (
                            <Nav.Link key={page} onClick={() => handleMenuItemClick(page)}>{page}</Nav.Link>
                        ))}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;