/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {connect} from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class EmpRegister extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      adminName: null,
      employee : null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    console.log(this.props)
    const setP=(name)=>{
      this.setState ({
        ...this.state,
        adminName : name
      })
    }

    const data = {adminId :this.props.adminId}

    fetch("/adminName", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
      })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data){         
      if(data.status === "success"){
        setP(data.name[0].name)
      }
      }).catch(function(err) {
      console.log(err)
      });
  }

    handleSubmit(event){

      event.preventDefault();
      const setE = (emp)=>{
        this.setState({
          ...this.state,
          employee : emp
        })
      }
      const data = {
        name : event.target.name.value
        ,password : event.target.password.value
        ,phoneno : event.target.phoneno.value
        ,address :event.target.address.value
        ,accno: event.target.accno.value
      }


      fetch("/empreg", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data){         
        if(data.status === "success"){
          setE(data.data[0])
          document.getElementById("regForm").reset()
        }
        }).catch(function(err) {
        console.log(err)
        });
    }
  render() {
    return (
      <>
        <UserHeader adminName={this.state.adminName}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                
                {this.state.employee !== null ? 
                <CardBody className="pt-0 pt-md-4">
                  
                  <div className="text-center">
                    <h3>
                      {this.state.employee ? this.state.employee.name : null}
                      <span className="font-weight-light"></span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.employee ? this.state.employee.address : null}
                     
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Employee Id - 
                      {this.state.employee ? this.state.employee.empid : null}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Account-No - 
                      {this.state.employee ? this.state.employee.accno : null}                      
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Phone-No - 
                      {this.state.employee ? this.state.employee.phoneno : null}                      
                    </div>
                    
                  </div>
                </CardBody>: null}
                
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Employee Registration</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit} method="post" id="regForm">
                    <h6 className="heading-small text-muted mb-4">
                     Employee information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Employee Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              name= "name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Account Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-first-name"
                              type="number"
                              name="accno"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              type="password"
                              name="password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              name="address"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                            Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              type="number"
                              name="phoneno"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                   <div className="text-center">
                   <Button
                  color="info"
                  type ="submit"
                >
                  Submit
                </Button >
                   </div>
                    <hr className="my-4" />
                    {/* Description */}
                                        
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
   
  }
}
const mapStateToProp=(state)=>{
  console.log(state)
  return {
    adminId : state.adminid
  }
}
export default connect(mapStateToProp)(EmpRegister);
