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
import {
  Card,
  CardHeader,
  Table,
  Row,
  Col
} from "reactstrap";

class Inventory extends React.Component {
  
  constructor(props) {
    super(props)  
    this.state={
      products:[],
      list : null
    }
    this.handleClick = this.handleClick.bind(this)
}

  handleClick(){
    console.log(this.state.products)
    var sum = 0;
    this.state.products.forEach(function(item){
      sum += item.cost * item.quantity
    });
    
    
    
    console.log(sum)
  }
  
  componentDidMount(){
    const setP = (data) =>{
      this.setState ({
        products : data
      })
    } 
    fetch("/productList", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data) {
      console.log(data);
      //tempstate.products=data
      setP(data) 
    }).catch(function(err) {
      console.log(err)
    });
  }

  disp=(pro)=>{ 
  return pro.map((data,key)=>{
    data.quantity = 0;
    console.log(data);
    return (
      <tr key={key}>
                      <th scope="row">{data.name}</th>
                      <td>{data.pid}</td>
                      <td>{data.cost}</td>
                      <td>{data.stock}</td>
                    </tr>
    )

  })
}
  
  render() {
    return (
      <>
        {/*Iot Tag registration form tag*/ }
        <Col lg="6" md="9">
        <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Product</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product ID</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Quantity</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.disp(this.state.products)}
                  </tbody>
                </Table>
              </Card>
              
        </Col>
        
        <col>{this.state.list}</col>
        
   </>
    );
  }
}
export default Inventory;
