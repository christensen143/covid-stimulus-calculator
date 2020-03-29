import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const App = () => {
  const [filingStatus, setFilingStatus] = useState('');
  const [rebate, setRebate] = useState(0);
  const [agi, setAgi] = useState(0);
  const [children, setChildren] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    calculateRebate();
  };

  const handleReset = e => {
    e.preventDefault();
    setFilingStatus('');
    setRebate(0);
    setAgi(0);
    setChildren(0);
    var ele = document.getElementsByName('filingStatus');
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
  };

  const calculateRebate = () => {
    let agiFloat = parseFloat(agi);
    let childRebate = children * 500;
    if (filingStatus === 'Single') {
      if (agiFloat <= 75000) {
        setRebate(1200 + childRebate);
      } else if (agiFloat > 75000 && agiFloat < 99000) {
        const diff = agiFloat - 75000;
        const multiplier = diff / 100;
        const reduction = multiplier * 5;
        setRebate(1200 - reduction + childRebate);
      } else {
        setRebate(0 + childRebate);
      }
    } else if (filingStatus === 'Head of Household') {
      if (agiFloat <= 112500) {
        setRebate(1200 + childRebate);
      } else if (agiFloat > 112500 && agiFloat < 136900) {
        const diff = agiFloat - 112500;
        const multiplier = diff / 100;
        const reduction = multiplier * 5;
        setRebate(1200 - reduction + childRebate);
      } else {
        setRebate(0 + childRebate);
      }
    } else if (filingStatus === 'Married') {
      if (agiFloat <= 150000) {
        setRebate(2400 + childRebate);
      } else if (agiFloat > 150000 && agiFloat < 198000) {
        const diff = agiFloat - 150000;
        const multiplier = diff / 100;
        const reduction = multiplier * 5;
        setRebate(2400 - reduction + childRebate);
      } else {
        setRebate(0 + childRebate);
      }
    }
  };

  return (
    <div className="mt-4">
      <Container>
        <Card>
          <Card.Header>Covid-19 Stimulus Calculator</Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <Card.Title>Filing Status</Card.Title>
              <Card.Text>
                {['Single', 'Head of Household', 'Married'].map(type => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      name="filingStatus"
                      type="radio"
                      value={filingStatus}
                      id={type}
                      label={type}
                      onChange={() => setFilingStatus(type)}
                    />
                  </div>
                ))}
              </Card.Text>
              <Card.Title>Number of Children (16 & under only)</Card.Title>
              <Card.Text>
                <Form.Group as={Row} controlId="NumberOfChildren">
                  <Form.Label column sm={3}>
                    Number of Children
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      value={children}
                      type="tel"
                      placeholder="Enter as number with no special characeters, ex: if you have 2 children enter 2"
                      onChange={e => setChildren(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Card.Text>
              <Card.Title>Adjust Gross Income</Card.Title>
              <Card.Text>
                <Form.Group as={Row} controlId="AdjustedGrossIncome">
                  <Form.Label column sm={3}>
                    Adjusted Gross Income
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      value={agi}
                      type="tel"
                      placeholder="Enter as number with no special characeters, ex: if your income is $40,000 enter 40000"
                      onChange={e => setAgi(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Card.Text>
              <Card.Title>Estimated Rebate</Card.Title>
              <Card.Text>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Estimated Rebate
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control type="email" disabled value={rebate} />
                  </Col>
                </Form.Group>
              </Card.Text>
              <Form.Group as={Row} controlId="Buttons">
                <Col sm={1}>
                  <Button variant="primary" type="submit">
                    Calculate
                  </Button>
                </Col>
                <Col sm={2}>
                  <Button variant="primary" type="submit" onClick={handleReset}>
                    Reset
                  </Button>
                </Col>
              </Form.Group>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default App;
