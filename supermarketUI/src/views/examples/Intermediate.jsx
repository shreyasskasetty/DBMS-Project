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
  Card,
  CardHeader,
  Col
} from "reactstrap";

class Intermediate extends React.Component {
     
  handleClick =(e)=>{
    e.preventDefault();
    console.log("Email: " + this.state.email);
    console.log("Address: "+this.state.address);
    console.log("Phone Number: "+this.state.phoneno);
    console.log("Customer Name: "+this.state.custname)
  }

  render() {
     setTimeout(() =>{
         this.props.history.push('/auth/register')
     },3000)
     const content = 'Processing ...';
    return (
      <>
        {/*Iot Tag registration form tag*/ }

        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                {content}
              </div>
              
            </CardHeader>
            
          </Card>
        </Col>
        
        <Col lg ="1" md = "1">
        </Col>
      </>
    );
  }
}

export default Intermediate;
