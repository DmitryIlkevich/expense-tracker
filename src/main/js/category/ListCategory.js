import React from 'react';
import axios from "axios";
import Category from "./Category";
import NewCategory from './NewCategory'

let source = axios.CancelToken.source();

/**
 * Collects all available categories
 */
class ListCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {categories: []};

        source = axios.CancelToken.source();
    }

    /**
     * Component mount event
     */
    componentDidMount() {
        // Send request to get all available categories
        axios.get('/category')
            .then(response => {
                this.setState({categories: response.data});
                console.log(this.state.categories);
            })
            .catch(error => {
                console.error(error);
            });
    }

    /**
     * Component unmount event
     */
    componentWillUnmount() {
        if (source) {
            source.cancel("Landing Component got unmounted");
        }
    }

    /**
     * Re-renders page
     */
    updateComponent = () => {
        this.componentDidMount();
    };

    render() {
        return (
            <div>
                <Category onNotifyParentCategoryDeletion={this.updateComponent} categories={this.state.categories}/>
                <br/>
                <NewCategory onNotifyParentNewCategoryCreated={this.updateComponent}/>
            </div>
        )
    }
}

export default ListCategory;