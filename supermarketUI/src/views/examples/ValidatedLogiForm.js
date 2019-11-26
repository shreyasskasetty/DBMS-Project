import React from 'react';
import {Formik} from 'formik'
import * as Yup from 'yup'
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
const ValidatedLoginForm=()=>(
        <Formik initialValues={{loginid:"",password: ""}}
        onSubmit={(values, {setSubmitting})=> {
            setTimeout(()=>{
                console.log("Logging in",values);
            },500);
        }}


        validationSchema={Yup.object().shape({
            number: Yup
            .number()
            .required("Required")
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
                        handleSubmit
                    
                
            } = props;
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
             
              <Form id="admin-login-form" role="form" onSubmit={event => this.handleSubmit(event)} method="POST">

                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="LoginID" 
                    type="number" 
                    value={values.number} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    name= "adminid"
                    className={errors.number && touched.number && "error"}/>
                  </InputGroup>
                  {errors.number && touched.number && (
            <div className="input-feedback">{errors.number && touched.number}</div>
                )}
                </FormGroup>
              
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" 
                    type="password" 
                    name = "password" 
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    className={errors.password && touched.password && "error"}/>
                  </InputGroup>
                  {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
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
                  <Button className="my-4" color="primary" type="submit" disabled={isSubmitting}>
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
                  }}
        </Formik>
);
export default ValidatedLoginForm;