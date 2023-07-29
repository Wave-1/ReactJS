import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/HoSo.css';

function ChamCong() {
    const [checkedIn, setCheckedIn] = useState(localStorage.getItem("checkedIn") === "true");

    const handleCheckIn = () => {
        setCheckedIn(true);
        localStorage.setItem("checkedIn", "true");
    }

    const handleCheckOut = () => {
        setCheckedIn(false);
        localStorage.setItem("checkedIn", "false");
    }


    class App extends React.Component {
      constructor(props) {
        super(props);
        this.updateDateTime = this.updateDateTime.bind(this);
        this._isMounted = false;
    
        this.state = {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        }
        this.interval = setInterval(this.updateDateTime, 1000);
      }
    
      componentDidMount() {
        this._isMounted = true;
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
        this._isMounted = false;
      }
    
      updateDateTime() {
        if (this._isMounted) {
          this.setState({
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
          });
        }
      }
    
      render() {
        return (
          <div>{this.state.date} {this.state.time}</div>
        );
      }
    }
    

    return (
        // <Container fluid>
        //     <Row className='d-flex justify-content-center align-items-center'>
        //         <Col><h2>Acacia</h2></Col>
        //         <Form>
        //             <div>
        //                 <App />
        //                 {!checkedIn ? (
        //                     <Button variant="primary" type="button" onClick={handleCheckIn}>
        //                         Check in
        //                     </Button>
        //                 ) : (
        //                     <Button className='bg-danger' variant="primary" type="button" onClick={handleCheckOut}>
        //                         Check out
        //                     </Button>
        //                 )}
        //             </div>
        //         </Form>
        //     </Row>
        // </Container>
        <Container fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={5} xs={12}>
            <h1 className='text-center mb-5 mt-5'>Acacia</h1>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <Row>
                    <h2 className="fw-bold mb-5 text-center"><img src={require('../../assets/icon-Dho.png')} alt='imgPlus' style={{ width: '35px' }} /><App /></h2>
                  </Row>
                  <div className="mb-3">
                    <Form>
                      <div className="d-grid">
                            {!checkedIn ? (
                            <Button variant="primary" type="button" onClick={handleCheckIn}>
                                Check in
                            </Button>
                        ) : (
                            <Button className='bg-danger' variant="primary" type="button" onClick={handleCheckOut}>
                                Check out
                            </Button>
                        )}
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default ChamCong;
