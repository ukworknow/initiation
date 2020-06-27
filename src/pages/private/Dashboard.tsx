import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  Container,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

const Title = styled.h2`
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

function Dashboard() {
  const [domains, setDomains] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.intelliscan.io/user/domains/", {
        headers: {
          token: `${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setDomains(res.data.domains));
  }, []);
  return (
    <Container>
      <Title>Dashboard</Title>
      <Row>
        {domains.map((item) => (
          <Col sm="6">
            <Card body>
              <CardTitle>{item}</CardTitle>
              <CardText>
                This is the domain.
              </CardText>
              <Button>Go to the domain</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
