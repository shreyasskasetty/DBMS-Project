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
import {connect} from "react-redux";
// reactstrap components
import firebase from '../../config/fbConfig'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";

class Notification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      adminName: null,
      employee : null,
      cardList : []
    }
    this.handleClick = this.handleClick.bind(this)
    console.log(props)
  }
  handleClick(event){
    console.log(this.state)
    const db = firebase.firestore()
    let id = event.target.id
   if (event.target.name === 'reject')
   {

    db.collection('argon').doc(id).delete();
   }
   else if (event.target.name === 'accept')
   {
     let list =this.state.cardList
      let data = list.find((ele)=>{
        return ele.id === event.target.id
      })
      console.log(data)
      this.Submit(data)
      db.collection('argon').doc(id).delete();


   }
  }
  disp=()=>{
    let list = this.state.cardList;
    return list.map((data,key)=>{
      return (
        <Col lg="6" xl="3" key={key}>
                  <Card key={key} id={data.id} className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            {data.name}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {data.phoneno}
                          </span>
                        </div>
                        
                      </Row>
                      <Button
                  color="primary"
                  name = "accept"
                  id = {data.id}
                  onClick ={this.handleClick}
                >
                  Accept
                </Button >
                <Button
                  color="red"
                  id = {data.id}
                  name = "reject"
                  onClick ={this.handleClick}
                >
                  Reject
                </Button >
                    </CardBody>
                  </Card>
                </Col>
      )
  
    })
  }
  setL=(data)=>{
    this.setState ({
      ...this.state,
      cardList:[
        ...this.state.cardList,
        data
      ]
    })
  }
  removeL = (data)=>{
    let list = this.state.cardList
    let newList = list.filter(function(value){
      return value.phoneno !== data.phoneno
    })

    this.setState({
      ...this.state,
      cardList : newList
    })
  }
  componentDidMount(){
    const setP=(name)=>{
      this.setState ({
        ...this.state,
        adminName : name
      })
    }
    console.log('hi')
    const data = {adminId :this.props.adminId}      
    console.log(data)
    fetch("/adminName", {
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
          setP(data.name[0].name)
          console.log(data.name[0].name)
        }
        }).catch(function(err) {
        console.log(err)
        });
    const db = firebase.firestore();

    db.collection("argon")
    .onSnapshot((snap) => {
      const changes = snap.docChanges();
    
      changes.forEach((change) =>{
      const data = change.doc.data()
      data.id = change.doc.id
      if (change.type === 'added')
      this.setL(data)
      else if (change.type === 'removed')
      this.removeL(data)
      })
    })


  }
    
  Submit(data){
      
      const setEmp=(data1)=>{
          this.setState({
            ...this.state,
            employee:data1.data[0]
          })
          console.log(this.state.employee.empid)
      }
      fetch("/empreg", {
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
          console.log(data.data[0])
          alert('successful')
          setEmp(data)
        }
        }).catch(function(err) {
        console.log(err)
        });
    }

  render() {
    console.log(this.props)
    return (
      <>
        <UserHeader adminName={this.state.adminName} count ={this.state.cardList.length}/>
        {/* Page content */}
        <Row>
        {this.disp()}
        </Row>
      </>
    );
   
  }
}
const mapStateToProp=(state)=>{
  console.log(state)
  return {
    adminId : state.adminid
  }
}
export default connect(mapStateToProp)(Notification);
