import React from 'react';
import {
    Container,
    Header,
    Title,
    Description,
    Button,
} from './WelcomePageStyles';

const Home = () => (
    <Container>
        <Header>
            <Title>Welcome to the client of the REST API for an university</Title>
            <Description>
                This website allows you to access resources and perform actions on them through HTTP requests.
            </Description>
        </Header>
        <Button href="http://localhost:8080/university/api/swagger-ui/index.html" target="_blank">View API Documentation</Button>
    </Container>
);

export default Home;