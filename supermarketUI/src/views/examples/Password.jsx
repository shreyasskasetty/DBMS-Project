import React from "react";
import {Formik} from 'formik'
import {connect} from 'react-redux';

import * as Yup from 'yup'
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
import { Policy } from "twilio/lib/jwt/taskrouter/TaskRouterCapability";

class Password extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        msg: '',
        name : '',
         address : '',
        emailid : '',
         phoneno : 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  
}
  
  handleSubmit(event){
    event.preventDefault();
    const data = {
      empid : event.target.empid.value
      ,npass : event.target.npass.value
      ,opass : event.target.opass.value
      ,cpass : event.target.cpass.value

    }

    console.log(data)
    if (data.cpass  === data.npass)
    {
    fetch("/passChange", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
  }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(data) {
      console.log(data)
      if(data.status === "success"){
         alert("Successfully Updated") 
         window.location.assign("/auth/register");
      }
      if(data.status === "failure"){
        alert("Failed") 
        document.getElementById('customer-form').reset();

     }

      
  }).catch(function(err) {
      console.log(err)
  });
}
    else    alert('Password Not Matching') 
  }    
  
  render() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return(
<Formik
    initialValues={{name: "", address: "", emailid:"",phoneno: ""}}
    onSubmit={(values, { setSubmitting }) => {
     
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string()
  .max(40, 'Please enter no more than 40 characters')
  .required( 'Please enter customer\'s name'),
    address: Yup.string()
    .max(50, 'Please enter no more than 50 characters')
    .required('Please enter customers address'),
    emailid: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
    phoneno: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 )
  })}
  >
   {props => {
     const {
       values,
       touched,
       errors,
       dirty,
       isSubmitting,
       handleChange,
       handleBlur,
       handleSubmit,
       handleReset,
       isValid
    } = props;
   
    return (
      <>
        
        
        <Col lg ="1" md = "1">
        </Col>

        
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Change Password </small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">

              {/*-----customer register form */ }
              <Form role="form" id="customer-form"  onSubmit={event => this.handleSubmit(event)} method="POST">
                  {/*Employee Id*/}
                <FormGroup>
                  <InputGroup className="input-group-alternativ￼b-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Employee Id" 
                    type="num￼ber" 
                    name ="empid" 
                    autoComplete="off" 
                    onBlur={handleBlur}
                    onChange={handleChange}/>
                  </InputGroup>
                </FormGroup>

                {/*Customer Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Present Password" 
                    name="opass" 
                    type="password" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off" />
                  </InputGroup>
                </FormGroup>

                {/*Customer Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="New Password" 
                    name="npass" 
                    type="password" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Confirm Password" 
                    name="cpass" 
                    type="password" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off" />
                  </InputGroup>
                </FormGroup>



               


                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit" >
                    Confirm Change
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          
        </Col>
        
      </>

    );
   }}
   </Formik>
    );
}
}
const mapStateToProps=(state)=>{
    console.log(state)  
    return {
      empId : state.empid,
      adminId : state.adminid
    }
  }
   const mapDispatchToProps= (dispatch)=>{
     return {
       updateEmpId : () =>{
        dispatch({
          type : 'updateEmpID',
          eLogin : false,
          empid : -1
        })
      }
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Password);
