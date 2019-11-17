import React, {Component, PropTypes} from 'react';
import {SketchField, Tools} from 'react-sketch';
import firebase from '../../config/fbConfig'

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from 'reactstrap'

class Sketch extends Component {
  Down = false
  X = []
  Y = []
  constructor(props){
    super(props)

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  Down = false
  handleMouseMove = (e) =>{
    var x = e.clientX
    var y = e.clientY
    if (this.Down)
    {
      if (x > 510 && x < 1000 && y < 760 && y > 280)
      {
        console.log(x+" "+y)
      this.X.push(x-500)
      this.Y.push(y-280)
      }
    }
  }
  handleMouseDown = (e) =>{
    this.Down = true
  }
  handleMouseUp = (e) => {
    this.Down = false
    
  }
  handleSubmit = (e)=>{
    e.preventDefault();
    const db = firebase.firestore()
    var number = e.target.number.value
    console.log(number)
    db.collection("Co-ordinates").doc(number).set({
      x : this.X,
      y : this.Y
    })
    .then(function() {
      console.log("Document successfully written!");
      window.location.assign('/auth/register')
     })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
   
  }
     render() {
        return (
          <>
          <div 
          onMouseMove = {this.handleMouseMove} onMouseDown = {this.handleMouseDown} onMouseUp = {this.handleMouseUp}>
            
            <Row className = "align-item-center">
              <Col lg="3"></Col>
              <Col lg="6">
                <div>
              <SketchField width='500px' 
                         height='500px' 
                         tool={Tools.Pencil} 
                         lineColor='white'
                         lineWidth={3}
                         onChange = {this.handleChange}
                         backgroundColor = 'black'
                         />
                         </div>
              </Col>
              
              <Col lg= "3">

              </Col>
              
              
            </Row>
            <Row className = "align-item-center">
              <Col lg="3"></Col>
              <Col lg="6" className = "align-item-center"  >
                <div>
                <Form role="form"  onSubmit={this.handleSubmit} >
              <FormGroup>
                  <InputGroup className="input-group-alternative mb-3 text-center">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-cart" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="number" type="number" name = "number"  />
                  </InputGroup>
                </FormGroup>                
                <div className="text-center align-item-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Upload
                  </Button>
                </div>

              </Form>
                         </div>
              </Col>
              
              
              
            </Row>
           

                         </div>
          
          </>
        )
     }
}
export default Sketch;