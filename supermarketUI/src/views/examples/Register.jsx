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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Register extends React.Component {
  handleClick =(e)=>{
    e.preventDefault();
    // let result =fetch('/submit-custform').then(
    //   response => {
    //     if(response.ok)
    //     {
    //       console.log(response.json())
    //     return response.json()
    //     }
    //     else{
    //       return null;
    //     }
    //   }
    // )
    // if(result!=null)
    // {
    //   console.log(result);
    //   alert(result);
    // }
    // else if(result == null){
    //   alert("Registration Unsuccessful");
    // }
  }
  
  handleEmailChange=(e)=>{
    this.setState({email: e.target.value});
 }
  handleAddressChange=(e)=>{
    this.setState({address: e.target.value})
  }
  handlePhoneNumberChange=(e)=>{
    this.setState({phoneno:e.target.value})
  }
  handleCustomerName =(e)=>{
    this.setState({custname:e.target.value})
  }
  render() {
    return (
      <>
        {/*Iot Tag registration form tag*/ }

        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>IOT Tag Register</small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                {/*Phone Number*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number" name="cphone" type="number" onChange={this.handleCustomerName} />
                  </InputGroup>
                </FormGroup>

                {/*TagID*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-cart" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Tag ID" type="text" name = "tagID" onChange={this.handleAddressChange} />
                  </InputGroup>
                </FormGroup>                
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Tag
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        
        <Col lg ="1" md = "1">
        </Col>

        {/*customer register form */ }
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Customer Registeration </small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form" action="/submit-custform" method="POST">
                {/*Customer Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" name="custname" type="text" onChange={this.handleCustomerName} />
                  </InputGroup>
                </FormGroup>

                {/*Address*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-square-pin" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Address" type="text" name = "address" onChange={this.handleAddressChange} />
                  </InputGroup>
                </FormGroup>

                {/*Phone Number*/}
                <FormGroup>
                  <InputGroup className="input-group-alternativ￼b-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="PhoneNumber" type="num￼ber" name ="pnumber" onChange={this.handlePhoneNumberChange}/>
                  </InputGroup>
                </FormGroup>

               {/**Email */ }
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name = "email" onChange={this.handleEmailChange} />
                  </InputGroup>
                </FormGroup>

                
                
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Register;
