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
import { Link } from "react-router-dom";
import {connect} from "react-redux";
// reactstrap components
import {
  UncontrolledCollapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
class AdminNavbar extends React.Component {

  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  empLogin = ()=>{
    return(
                   <NavLink
                    className="nav-link-icon"
                    to="/auth/login"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Employee Login</span>
                  </NavLink>
    )
  }
  inventory=()=>{
    return(
      <NavLink
                    className="nav-link-icon"
                    to="/auth/inventory"
                    tag={Link}
                  >
                    <i className="ni ni-archive-2" />
                    <span className="nav-link-inner--text">Inventory</span>
                  </NavLink>
     
    )
  }
  register = ()=>{
    return(
      <NavLink
                    className="nav-link-icon"
                    to="/auth/register"
                    tag={Link}
                  >
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
     
    )
  }
  handleClick(event){
    console.log('Clicked');
    this.props.updateEmpId()
  }
  adminLogin = ()=>{
    return(
      <NavLink
      className="nav-link-icon"
      to="/auth/adminlogin"
      tag={Link}
    >
      <i className="ni ni-key-25" />
      <span className="nav-link-inner--text">Admin Login</span>
    </NavLink>
    )
  }
  logout = ()=>{
    return(
      <NavLink
      className="nav-link-icon"
      to="/auth/login"
      tag={Link}
    >
      <i className="ni ni-key-25" />
      <span className="nav-link-inner--text">Logout</span>
    </NavLink>
    )
  }

  billing = ()=>{
    return(
      <NavLink
      className="nav-link-icon"
      to="/auth/billing"
      tag={Link}
    >
      <i className="ni ni-basket" />
      <span className="nav-link-inner--text">Billing</span>
    </NavLink>
    )
  }
  password = ()=>{
    return(
      <NavLink
      className="nav-link-icon"
      to="/auth/password"
      tag={Link}
    >
      <i className="ni ni-basket" />
      <span className="nav-link-inner--text">Password</span>
    </NavLink>
    )
  }

  disp= () =>{
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavItem>
            <img height="50" width="150"
            alt="..." src={require("assets/img/brand/argon-react-white.png")} />              
            </NavItem>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img height="42" width="42"
                        alt="..."
                        src={require("assets/img/brand/argon-react.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      className="navbar-toggler"
                      id="navbar-collapse-main"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>

              <NavItem >
                  {this.props.eLogin?this.billing():null}
                </NavItem >
                <NavItem >
                  {this.props.eLogin?this.inventory():null}
                </NavItem >

                <NavItem>
                  {this.props.eLogin?this.password():null}
                </NavItem>

                <NavItem >
                  {this.props.eLogin?this.register():this.empLogin()}
                </NavItem >
                    
                <NavItem onClick={this.handleClick}>
                  {this.props.eLogin?this.logout():this.adminLogin()}
                </NavItem>
                

              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    )
  } 
  render() {
    return (
        this.disp()
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    eLogin : state.eLogin,
    aLogin : state.aLogin
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
export default connect(mapStateToProps,mapDispatchToProps)(AdminNavbar);
