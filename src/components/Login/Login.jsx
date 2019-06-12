import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { getDataWithQuery } from '../../utils/api';
import storage from '../../utils/storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: false,
      loggedIn: false,
    }

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  updateUsername({target}) {
    this.setState({username: target.value, loginError: false});
  }

  updatePassword({target}) {
    this.setState({password: target.value, loginError: false});
  }

  //si existe user data y tiene lenght
  checkUser(userData) {
    if (userData && userData.length) {
      storage.store('user', userData[0]);
      this.setState({loggedIn: true});
      // console.log(storage.retreive('user')); //para ver cómo se guarda el user
    } else {
      this.setState({loginError: true});
    }
  }

  logIn() {
    getDataWithQuery(({...this.state}), 'users').then(this.checkUser);
  } //estoo tamb nos sirve para hacer busquedas (search)

  render() {
    let alert = null;
    if (this.state.loggedIn) {
      return (<Redirect to="/list" />);
    }
    if (this.state.loginError) {
      alert = (<Alert variant="danger">Check password or username!</Alert>);
    }
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.username} // me convierte estos dos inputs en esetado? el componenete cuando cambia altera el estado, asi el estado es mi fuente de verdad, lo que diga mi estado es la verdad de la placiación. En angular es diferente  (react tiene one way data flow)
              onChange={this.updateUsername} //usa esa función cuando te cambias //aqui altera el estado
            //aplica para user y password
            />
            
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.updatePassword}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="button" onClick={this.logIn}>Log In</Button>
        </Modal.Footer>
        {alert}
      </Modal.Dialog>
    );
  }
}

export default Login;

// import React from 'react';
// import Link from 'react-router-dom/Link';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


// // const Login = () => (
// //     <Form>
// //       <Form.Group controlId="formBasicEmail">
// //         <Form.Label>Email address</Form.Label>
// //         <Form.Control type="email" placeholder="Enter email" />
// //         <Form.Text className="text-muted">
// //           We'll never share your email with anyone else.
// //         </Form.Text>
// //       </Form.Group>
  
// //       <Form.Group controlId="formBasicPassword">
// //         <Form.Label>Password</Form.Label>
// //         <Form.Control type="password" placeholder="Password" />
// //       </Form.Group>
// //       <Form.Group controlId="formBasicChecbox">
// //         <Form.Check type="checkbox" label="Check me out" />
// //       </Form.Group>
// //       <Button variant="primary" type="submit">
// //         Submit
// //       </Button>
// //     </Form>
// //   )
// const Login = () => (
//     <Modal.Dialog>
//         <Modal.Header>
//             <Modal.Title>Log In</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control type="email" placeholder="Enter email" />
//                 <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//     </Form.Text>
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//             </Form.Group>
//             <Form.Group controlId="formBasicChecbox">
//                 <Form.Check type="checkbox" label="Remember Me" />
//             </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//             <Link to="/List">
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//             </Link>
//         </Modal.Footer>
//     </Modal.Dialog>
// )
//   export default Login;