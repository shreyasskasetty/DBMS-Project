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
  Badge,
  Card,
  Col,
  Dropdown,
  FormGroup,
  Input,
  CardHeader,
  CardFooter,
  Button,
  Media,
  Progress,
  Table,
  Container,
  Row,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class Tables extends React.Component {
  constructor(props) {
    super(props)  
    this.state={
      products:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  handleSubmit(event){
    event.preventDefault();
    const setP = (data) =>{
      this.setState({
        products : data
      })
    }
    console.log(event.target.id)

    if(event.target.id == "addProduct")
    { 
      const data = {
      section: event.target.section.value,
      pname : event.target.pname.value,
      cost : event.target.cost.value,
      stock : event.target.stock.value
      }
      console.log(data)
      fetch("/addPro", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data){         
        if(data.status === "success"){
          alert("sucessful")
          document.getElementById('addProduct').reset();
        }
        }).catch(function(err) {
        console.log(err)
        });
    }
    else{
      const data = {
        pid : event.target.pid.value,
        cost : event.target.cost.value,
        stock : event.target.stock.value
      }
      fetch("/updatePro", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data){         
        if(data.status === "success"){
          document.getElementById('updateForm').reset();
          setP(data.data)
        }
        }).catch(function(err) {
        console.log(err)
        });
    }
    

  }
 
   
  componentDidMount(){
    const setP = (data) =>{
      this.setState ({
        products : data
      })}

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
        setP(data)
        console.log(data)
      }).catch(function(err) {
        console.log(err)
      });

    }


  disp=(pro)=>{ 
    return pro.map((data,key)=>{
      data.quantity = 0;
      return (
        <tr key = {key}>
                      <th scope="row">
                        
                          <Media>
                            <span className="mb-0 text-sm">
                              {data.name}
                            </span>
                          </Media>
                        
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {data.pid}
                        </Badge>
                      </td>
                      <td>{data.cost} ₹​ </td>
                      
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{data.stock}</span>
                          <div>
                            <Progress
                              max="1000"
                              value={data.stock}
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      
                      
                    </tr>
      )
  
    })
  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className=" bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="mb-0 text-white">Product tables</h3>
                </CardHeader>
                <Table 
                  className="align-items-center table-dark table-flush"
                  responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product ID</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Stock</th>
                    </tr>
                  </thead>
                  <tbody>{this.disp(this.state.products)}</tbody>
                </Table>
                <CardFooter className="py-4 bg-default shadow">
                  
                  <nav aria-label="...">

                  <Form onSubmit={this.handleSubmit} method="post" id = "updateForm">
                  <Row className="justify-content-center">
                        
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">PID</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="pid"
                              type="number"
                              name="pid"
                              defaultValue = "0"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">COST</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="cost"
                              type="number"
                              defaultValue = "0"
                              name="cost"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">STOCK</b>                            
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              defaultValue = "0"
                              id="STOCK"
                              type="number"
                              name="stock"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" name = "confirm" type="submit" className=" text-center">
                      UPDATE
                      </Button>
                      </Form>
                    
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
          <br>
          </br>
          <br>
          </br>
          <Row>
          <div className="col">
              <Card className=" bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="mb-0 text-white">Add Product</h3>
                </CardHeader>
                <Table 
                  className="align-items-center table-dark table-flush"
                  responsive>
                  
                </Table>
                <CardFooter className="py-4 bg-default shadow">
                  
                  <nav aria-label="...">

                  <Form onSubmit={this.handleSubmit} method="post" id = "addProduct">
                  <Row className="justify-content-center">
                        
                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">Product Name</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="pname"
                              type="Text"
                              name="pname"
                              defaultValue = ""
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">COST</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="cost"
                              type="number"
                              defaultValue = "0"
                              name="cost"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">STOCK</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="stock"
                              type="number"
                              defaultValue = "0"
                              name="stock"
                            />
                          </FormGroup>
                        </Col>
                       
                        <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
               
                <Col lg="3">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                            <b className="text-white">Section</b>
                            </label>
                            <Input
                              className="form-control-alternative text-dark"
                              id="section"
                              type="text"
                              name="section"
                            />
                          </FormGroup>
                        </Col>
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem >secA</DropdownItem>
                <DropdownItem>secB</DropdownItem>
                <DropdownItem>secC</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
                        

            <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      Custom toggle
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
      <Dropdown.Item eventKey="1">Red</Dropdown.Item>
      <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
      <Dropdown.Item eventKey="3" active>
        Orange
      </Dropdown.Item>
      <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

                       
                      </Row>
                      <Button color="primary" name = "confirm" type="submit" className=" text-center">
                      ADD
                      </Button>
                      </Form>
                    
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          
        </Container>
      </>
    );
  }
}

export default Tables;
