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
import {connect} from 'react-redux';

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
  Col
} from "reactstrap";

class Login extends React.Component {
//   constructor(props) {
//     super(props)
//     console.log('Object props')
//     console.log(props);
//     this.handleSubmit = this.handleSubmit.bind(this)

// }
constructor(props) {
  super(props);
  console.log(props)
}
  
  handleSubmit(event){
    event.preventDefault();
    const tempProp = this.props;
    const data = {
      empid :  event.target.empid.value, 
      password : event.target.password.value, 
      mssg : ''
    }
    fetch("/emplogin", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
  }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(dat) {
    console.log(data);
    console.log('again')
    console.log(tempProp)
      if(dat.success)
      {
      tempProp.updateEmpId(data.empid)
      window.location.assign("/auth/register");
      }
      else
       alert('Wrong Password')
     // redirect to other page
  }).catch(function(err) {
      console.log(err)
  });
  }    
  render() {
    console.log(this.props);
    return (
      <> 
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in </small>
              </div>
             
            </CardHeader>
           
            <CardBody className="px-lg-5 py-lg-5">
              {/*Email ID*/}
              <Form role="form" onSubmit={event => this.handleSubmit(event)} method="POST">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="EmployeeID" name = "empid"type="ID" />
                  </InputGroup>
                </FormGroup>

                {/*Password*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" name = "password" type="password" />
                  </InputGroup>
                </FormGroup>

                {/* Sign in BUTTON */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
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

const mapStateToProps = (state) => {
  return {
    empId : state.empId,
    adminId : state.adminId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateEmpId : (id) =>{
      console.log('id is' + id)
      dispatch({
        type : 'updateEmpID',
        empid : id
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
