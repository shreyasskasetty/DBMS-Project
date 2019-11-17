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

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  } 
    
    handleSubmit(event){
      event.preventDefault();
      console.log('Sign In')
      console.log("ELogin: "+this.props.eLogin+" ALogin: "+this.props.aLogin)
      if (!(this.props.eLogin ^ this.props.aLogin))
      {
      const tempProp = this.props;
      console.log(event.target.adminid.value);
      const data = {
        adminid :  event.target.adminid.value, 
        password : event.target.password.value, 
        mssg : ''
      }
      
      fetch("/adlogin", {
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
     
        if(dat.success)
        {
        tempProp.updateEmpId(data.adminid)
        window.location.assign("/admin/Notification");
        }
        else
         alert('Wrong Password')
       // redirect to other page
    }).catch(function(err) {
        console.log(err)
    });
    }
    else alert('eMPLOYEE Should Logout');
  
    }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign In</small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
             
              <Form role="form" onSubmit={event => this.handleSubmit(event)} method="POST">

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="LoginID" type="text" name= "adminid"/>
                  </InputGroup>
                </FormGroup>
              
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name = "password"/>
                  </InputGroup>
                </FormGroup>
                
                <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div>
                
                <div className="text-center">
                  
                  {/* Sign in BUTTON */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    eLogin : state.eLogin,
    aLogin : state.aLogin
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateEmpId : (id) =>{
      dispatch({
        type : 'updateAdminID',
        adminid : id,
        aLogin : true
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AdminLogin);
