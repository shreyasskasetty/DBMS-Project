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
  Button,
  Card,
  CardHeader,
  Table,
  Row,
  Input,
  Form,
  Col
} from "reactstrap";

class Billing extends React.Component {
  
  constructor(props) {
    super(props)  
    this.state={
      products:[],
      list : 0,
      sum : 0
    }
    this.handleClick = this.handleClick.bind(this)
    this.billingList = this.billingList.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}
  handleSubmit(event){
    event.preventDefault();
    console.log(event.target.phoneNo.value)
        
        var data = []
        this.state.products.forEach(function(item){
          if (item.quantity !== 0){
            var pro = {
            pid : item.pid,
            name : item.name,
            quantity : item.quantity
            }
            data.push(pro)
          }
        });
        
        console.log(data)
        var d = new Date()
        var date = d.getFullYear()+":"+d.getMonth()+":"+d.getDate()
        const data1 = {
          data : data,
          phoneNo : event.target.phoneNo.value,
          date : date,
          emailid: event.target.emailId.value,
          sum : document.getElementById('sum').textContent
        }
        console.log(data1)
        if (data1.phoneNo)
        {
          fetch("/confBilling", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify(data1) 
            })
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.json();
            })
            .then(function(data){         
              if (data.status === "success")
              {
                window.location.assign("/auth/register");
              }
              else if (data.status === "failure")
              {
                alert(data.message)
              }
            }).catch(function(err) {
            console.log(err)
            });
        }
        else {
          alert('Phone Number')
        }
  }

  handleClick(event){

    if (event.target.name === "generate"){
      console.log("generate")
      
      this.setState({
      ...this.state,
      list : 1
      })  
    }

    if (event.target.name === "back"){
     
      this.setState({
        ...this.state,
        list : 0
      })  
    }
  }
  handleChange(event){
    console.log(event.target)
  }
  billingList =()=>{
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
                    {/* <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div> */}
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
              <div className="text-muted text-center mt-2 mb-4">
              <Button color="primary" onClick={this.handleClick} name = "generate">
              Generate Bill
              </Button>
              </div>
              
        </Col>
        
        
   </>
  )}
  cList = ()=>{
    var sum = 0;
    this.state.products.forEach(function(item){
      sum += item.cost * item.quantity
    });
    const dispList = () => {
      return (
        this.state.products.map((data,key)=>{
          if (data.quantity !== 0){          
          return(
          <tr key={key}>
            <th scope="row" className = "text-center">{data.name}</th>
            <td className = "text-center">{data.quantity}</td>
          </tr>
          )
          }
          else
          {return null} 
            
      })
    )}

    return(
    <>
        {/*Iot Tag registration form tag*/ }
        <Col lg="6" md="9">
        <Form onSubmit={this.handleSubmit}>

        <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0 text-center">Product</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" className = "text-center">Product</th>
                      <th scope="col" className = "text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispList()}
                    <tr>
                      <th scope="col" className = "text-center"><b>Total</b></th>
                      <th id="sum" scope="col" className = "text-center" name = "sum">{sum} </th>
                    </tr>
                  </tbody>
                </Table>
              </Card>

                <div className="text-muted text-center mt-2 mb-4">
              

              <Col >
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">Phone Number</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="phoneNo"
                              type="number"
                              name="phoneNo"
                              autoComplete = "off"
                            />
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">Email ID</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="emailId"
                              type="text"
                              name="emailId"
                              autoComplete = "off"
                            />
                        </Col>
                        <br></br>
                        <Button value={sum} color="primary" name = "confirm" type="submit">
                    Confirm Products
              </Button>

              <Button  color="primary" onClick={this.handleClick} name = "back">
                    Back
              </Button>
              </div>
                </Form>
              
              
        </Col>
        
        
   </>
  )}

  componentDidMount(){
    const tempstate = this.state;
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
      if (tempstate.products.length === 0)
      setP(data) 
    }).catch(function(err) {
      console.log(err)
    });
  }

  disp=(pro)=>{ 
  return pro.map((data,key)=>{
    if (!('quantity' in data))
    data.quantity = 0;
    return (
      <tr key={key}>
                      <th scope="row">{data.name}</th>
                      <td>{data.pid}</td>
                      <td>{data.cost}</td>
                      <td>
                        <div>
                        <input type="number" defaultValue={data.quantity} className="number text-center" min="1" 
                        max = {data.stock}  style = {{width: 50}} onChange = {
                          (e)=>{
                            if (parseInt(e.target.value) <= data.stock)
                            data.quantity = parseInt( e.target.value)
                            else
                            e.target.value = 0
                          }
                        }></input>
                        <sub></sub>
                        </div>
                      </td>
                    </tr>
    )

  })
}
  
  render() {
    
    return (
       this.state.list ?this.cList(): this.billingList()
    );
  }
}
export default Billing;
