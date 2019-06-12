import React, {Component} from 'react';

//Actions

import {postData} from '../../../utils/api';

//components
import ItemForm from '../ItemForm/ItemForm'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
// import Form from 'react-bootstrap/Form';

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            value: 0,
            error: false,
        };
        // this.updateName = this.updateName.bind(this);
        // this.updateDescription = this.updateDescription.bind(this);
        // this.updateValue = this.updateValue.bind(this);
        this.create = this.create.bind(this);
    }

    // updateName({ target }) {
    //     this.setState({ name: target.value });
    // }

    // updateDescription({ target }) {
    //     this.setState({ description: target.value });
    // }

    // updateValue({ target }) {
    //     this.setState({ value: Number(target.value) });
    // }

    // showError() {
    //     this.setState({ error: true });
    // }

    create(data) {
        postData('items', data).then(this.props.hide).catch(this.showError);
    }

    render() {
        const alert = this.state.error && (<Alert variant="danger"> Something went wrong </Alert>);
        return (
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>New Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ItemForm submit={this.create} data={{}}/>
               </Modal.Body>

             { alert }
         </Modal>
        )
    }
}

export default CreateItem;