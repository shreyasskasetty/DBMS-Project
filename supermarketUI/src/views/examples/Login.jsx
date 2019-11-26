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
  Col
} from "reactstrap";
class Login extends React.Component {

constructor(props) {
  super(props);
  this.state ={
    empid: "",
    empidfield: false,
    password: false
  }
  this.onChange = this.onChange.bind(this);
} 
handleClick(event){
  console.log('Clicked');
  this.props.updateEmpId()
}
  onChange(e){
    this.setState({empidfield:true,passwordfield:true})
  }
  handleSubmit(event){
    console.log(this.state)
    event.preventDefault();
    if (!(this.props.eLogin ^ this.props.aLogin))
    {
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
  else alert('Admin Should Logout');

    }
  componentDidMount(){
    this.setState({empidfield:false, passwordfield:false})
  }
  render() {
    return (
      <Formik
      initialValues={{empid:"",password: ""}}
        onSubmit={(values, {setSubmitting})=> {
            setTimeout(()=>{
                this.handleSubmit(values)
                setSubmitting(false)
            },500);
        }}


        validationSchema={Yup.object().shape({
            empid: Yup
            .number()
            .required("No Employee ID provided")
            .positive()
            .integer(),
            password: Yup.string()
            .required("No password provided.")
            .min(4,"password is tooo short - should be 4 characters atleast")
        })}
      >
        {
                props=>{
                    const{
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid
                    
                
            } = props;
        return(
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
                    <Input  onChange = {handleChange} placeholder="EmployeeID"
                    value ={values.empid}
                    type="number"
                    onBlur={handleBlur} 
                    autoComplete="off"
                    name= "empid"
                    className={errors.empid && touched.empid && "error"}/>
                  </InputGroup>
                  {errors.empid && touched.empid && (
            <div style={{ color: 'red' }}>{errors.empid}</div>
                )}
                </FormGroup>

                {/*Password*/}
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" 
                    name = "password" 
                    type="password" 
                    value={values.password}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    autoComplete="off"
                    className={errors.password && touched.password && "error"}/>
                  </InputGroup>
                  {errors.password && (
                      <div style={{ color: 'red' }}>{errors.password}</div>
                  )}
                </FormGroup>

                {/* Sign in BUTTON */}
                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={!isValid}>
                    Sign in
                  </Button>
                </div>

              </Form>
            </CardBody>

          </Card>
         
        </Col>
      </>
            );    }}
                </Formik>
    );
  }
}

const mapStateToProps = (state) =>{
  console.log(state)
  return {
    eLogin : state.eLogin,
    aLogin : state.aLogin
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateEmpId : (id) =>{
      console.log(id)
      dispatch({
        type : 'updateEmpID',
        empid : id,
        eLogin : true
      })
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
