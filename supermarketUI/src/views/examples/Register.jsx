import React from "react";
import {connect} from 'react-redux';
import {Formik} from 'formik'
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

class Register extends React.Component {
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
    this.logChange = this.logChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
}
logChange(e) {
  e.preventDefault();
  this.setState({[e.target.name]: e.target.value});  
}
  handleClick=(e)=>{
    e.preventDefault();
    window.location.assign("/auth/Sketch");
  }
  handleSubmit(event){
    event.preventDefault();
    const data = {
      name : event.target.name.value
      ,emailid : event.target.emailid.value
      ,phoneno : event.target.phoneno.value
      ,address :event.target.address.value
      ,empid:this.props.empId
      ,mssg : this.state.msg
    }
    console.log(data)
    fetch("/signup", {
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
    
    document.getElementById('customer-form').reset();
      alert('successully registered')
     
      
      if(data === "success"){
         this.setState({msg: "Thanks for registering"});
         alert(this.state.msg) 
      }
  }).catch(function(err) {
      console.log(err)
  });
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
        {/*Iot Tag registration form tag*/ }

        {/* <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>IOT Tag Register</small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">       
                <div className="text-center">
                  <Button className="mt-4" color="primary" onClick={this.handleClick}>
                    Start
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col> 
      */}
        
        <Col lg ="1" md = "1">
        </Col>

        
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Customer Registeration </small>
              </div>
              
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">

              {/*-----customer register form */ }
              <Form role="form" id="customer-form"  onSubmit={event => this.handleSubmit(event)} method="POST">
                {/*Customer Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" 
                    name="name" 
                    type="text" 
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off" />
                  </InputGroup>
                  {errors.name && touched.name ? (             
                    <div style={{color: 'red'}}>{errors.name}</div>           
                    ) : null}
                </FormGroup>

                {/*Address*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-square-pin" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Address" type="text" name = "address"  onChange={handleChange} onBlur={handleBlur} value={values.address} autoComplete="off" />
                  </InputGroup>
                  {errors.address && touched.address ? (             
                    <div style={{color: 'red'}}>{errors.address}</div>           
                    ) : null}
                </FormGroup>
                {/*Phone Number*/}
                <FormGroup>
                  <InputGroup className="input-group-alternativ￼b-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="PhoneNumber" 
                    type="num￼ber" 
                    name ="phoneno" 
                    autoComplete="off" 
                    value={values.phoneno}
                    onBlur={handleBlur}
                    onChange={handleChange}/>
                  </InputGroup>
                  {errors.phoneno? (             
                    <div style={{color: 'red'}}>{errors.phoneno}</div>           
                    ) : null}
                </FormGroup>

               {/**Email */ }
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" 
                    type="email" 
                    name = "emailid" 
                    autoComplete="off" 
                    value={values.emailid}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                  </InputGroup>
                  {errors.emailid && touched.emailid ? (             
                    <div style={{color: 'red'}}>{errors.emailid}</div>           
                    ) : null}
                </FormGroup>


                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit" disabled={!isValid}>
                    Create account
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
export default connect(mapStateToProps,mapDispatchToProps)(Register);