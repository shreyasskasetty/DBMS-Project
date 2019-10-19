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
  state = {
    customers:[]
  }
  componentDidMount(){  
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(data =>{
    this.setState ({
      customers : data
    })
    console.log(data)}
  ).catch(error => this.setState({ error, isLoading: false }));
}
  render() {
     setTimeout(() =>{
         this.props.history.push('/auth/register')
     },2000)
    return (
      <>
        {/*Iot Tag registration form tag*/ }

        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
              {this.state.customers.map(member =>
                        <tr key={member.cid}>
                        <td>{member.name} </td>
                        </tr>
                    )}
              </div>
            </CardHeader>
            
          </Card>
        </Col>
      </>
    );
  }
}

export default Intermediate;
