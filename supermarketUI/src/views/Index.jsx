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
import firebase from '../config/fbConfig'

// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
} from "variables/charts.jsx";

import Header from "components/Headers/Header.jsx";
import { func } from 'prop-types';

class Index extends React.Component {
  constructor(props){
    super(props)
    this.dispTable = this.dispTable.bind(this )
  }
  state = {
    activeNav: 1,
    chartExample1Data: "data1",
    chartExampl : {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  if (!(value % 10)) {
                    //return '$' + value + 'k'
                    return value;
                  }
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function(item, data) {
              var label = data.datasets[item.datasetIndex].label || "";
              var yLabel = item.yLabel;
              var content = "";
              if (data.datasets.length > 1) {
                content += label;
              }
              content += yLabel;
              return content;
            }
          }
        }
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: []
          }
        ]
      }
    },
    chartExampl1 : {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  if (!(value % 10)) {
                    //return '$' + value + 'k'
                    return value;
                  }
                }
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function(item, data) {
              var label = data.datasets[item.datasetIndex].label || "";
              var yLabel = item.yLabel;
              var content = "";
              if (data.datasets.length > 1) {
                content += label;
              }
              content += yLabel;
              return content;
            }
          }
        }
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: []
          }
        ]
      }
    },
    cusData:[]
  };

  componentDidMount(){
    const setP= (dat)=>{
      console.log('chnages')
      var labels = []
      var qu = []
      for (let i=0; i< dat.length;i++)
      {
        labels.push(dat[i].name)
        qu.push(dat[i].sq)
      }
      var temChat = this.state.chartExampl
      temChat.data.labels = labels
      temChat.data.datasets.push({label: "sales", data : qu})
      this.setState({
          ...this.state,
          chartExampl : temChat
      })
    }

    const setC = (data)=>{
      this.setState({
        ...this.state,
        cusData : data
      })
    }
    fetch("/chartData", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: null
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
          setP(data.rows)
        }
        else if (data.status === "failure")
        {
          alert(data.message)
        }
      }).catch(function(err) {
      console.log(err)
      });

      fetch("/cusData", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: null
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
            setC(data.rows)
          }
          else if (data.status === "failure")
          {
            alert(data.message)
          }
        }).catch(function(err) {
        console.log(err)
        });
      
      
  }

  mailOffer=(sec,id)=>{
    fetch("/secProds", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify({section:sec,cid:id})
      })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data){
        if (data.staus === true)
        {
          alert('offer sent')
        }
        else if (data.staus === false)
        {
          alert(data.message)
        }
      }).catch(function(err) {
      console.log(err)
      });
  }
  handleClick = (e)=>{
    e.preventDefault()
    var id = e.currentTarget.dataset.id
    const setX= (dat)=>{
      var labels1 = []
      var qu1 = []
      for (let i=0; i< dat.length;i++)
      {
        labels1.push(dat[i].pid)
        qu1.push(dat[i].sq)
      }
      var temChat = this.state.chartExampl1
      temChat.data.labels = labels1
      temChat.data.datasets.push({label: "sales", data : qu1})
      this.setState({
          ...this.state,
          chartExampl1 : temChat
      })
    }
    
    fetch("/cusAnalysis", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'},
      body: JSON.stringify({cid : id})
      })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data){
        if (data.staus === true)
        {
          setX(data.data)
        }
        else if (data.staus === false)
        {
          alert(data.message)
        }
      }).catch(function(err) {
      console.log(err)
      });
      fetch("/analysis", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'},
        body: JSON.stringify({cid : id})
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data){
          if (data.staus === true)
          {
            alert(data.loc)
          }
          else if (data.staus === false)
          {
            alert(data.message)
          }
        }).catch(function(err) {
        console.log(err)
        });
        const db = firebase.firestore();

        db.collection("Results")
    .onSnapshot((snap) => {
      const changes = snap.docChanges();
    
      changes.forEach((change) =>{
      const data = change.doc.data()
      data.id = change.doc.id
      if (change.type === 'added')
       { console.log(data)
        if (data.x < 150 )
          this.mailOffer('secA',id)
        if (data.x >= 150 && data.x < 300)
        this.mailOffer('secB',id)
        if (data.x >= 300)
        this.mailOffer('secB',id)
      db.collection('Results').doc(data.id).delete();

      }

      else if (change.type === 'removed')
        console.log(data)
      })
    })
  }


  dispTable = ()=>{
    var list = this.state.cusData
    if (list.length !== 0)
    {
      return(
        list.map((data,key)=>{
          return(
            <tr key = {data.cid} data-id= {data.cid} value={data.cid} onClick={this.handleClick}>
                      <th scope="row"  ><div id = {data.cid}> {data.name}</div></th>
                      <td>{data.sq}</td>
                      <td>
                      <div className="col text-right">
                      <Button
                        color="primary"
                        size="sm"
                        value = {data.cid}
                      >
                        Analyse
                      </Button>
                    </div>
                      </td>
                     
                    </tr>
          )
        })
      )
    }
    else return null
  }

  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Customer visits</h3>
                    </div>
                    
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Customer name</th>
                      <th scope="col">Visits</th>
                     
                    </tr>
                   
                  </thead>
                  <tbody>
                    {this.dispTable()}

                  </tbody>
                </Table>
              </Card>
            </Col>

            

            {/*Total Sales */}
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
               
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={this.state.chartExampl.data}
                      options={this.state.chartExampl.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl="4"> 
            <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Customer
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
               
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={this.state.chartExampl1.data}
                      options={this.state.chartExampl1.options}
                    />
                  </div>
                </CardBody>
                </Card>
                
            </Col> 
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;