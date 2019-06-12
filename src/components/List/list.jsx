import React, { Component } from 'react';

//actions
import {getData} from '../../utils/api'

//components
import Button from 'react-bootstrap/Button';
import Item from './Item/item';
import CreateItem from './Createitem/CreateItem'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [],
            lastClicked: null,
        }
        this.updateList = this.updateList.bind(this);
        this.changeLastClicked = this.changeLastClicked.bind(this);
        this.createItem = this.createItem.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    //cuando hace su primer render, cuan ya se monta a nuestro irtual dom.
    componentDidMount() {
        this.updateList();
    }

    updateList() {
        getData('items').then((items) => this.setState({items}));
    }

    changeLastClicked(id) {
        this.setState({ lastClicked: id });
    }

    createItem(){
        this.setState({creating:true});
    }

    closeModal(){
        this.setState({creating:false});
        this.updateList();
    }

    renderItems() {
        return this.state.items.map((item, i) => (
            <Item
                key={`item-${i}`}
                lastClicked={this.state.lastClicked}
                changeLastClicked={this.changeLastClicked}
                updateList={this.updateList}
                {...item}
            />
        ));
    }

    render() {
        return (
            <>
            <CreateItem show={this.state.creating} hide={this.closeModal} />
            <Button variant="primary" onClick={this.createItem}> Add new item </Button>
            <table className="list">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        </>
        );
    }
}

export default List;