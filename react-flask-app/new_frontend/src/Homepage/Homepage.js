import React, { Component } from 'react';
import Header from './Header/HeaderWrapper';
import IOWrapper from './IOWrap/IOWrapper';
import Results from './Results/ResultsWrapper';
import axios from 'axios';

export default class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            output: {
                author: [],
                bias_results: {},
                date: "",
                feedText: "",
                related: {},
                title: ""
            },
            results: false,
            input_type: '',
        }
        this.handlePTSubmit = this.handlePTSubmit.bind(this);
        this.handleURLSubmit = this.handleURLSubmit.bind(this);
    }
    handlePTSubmit = (myText) => {
        console.log("Input: " + myText);
        this.setState({loading: true});
        axios.post("/result", {myText})
            .then(res => {
                this.setState({input_type: 'plaintext'})
                this.setState({ output: res.data })
                this.setState({ loading: false })
                this.setState({results: true})
                console.log(res.data);
            });
    }
    handleURLSubmit = (input_url) => {
        console.log("Input: " + input_url);
        this.setState({loading: true});
        axios.post("/scrape", {input_url})
            .then(res => {
                this.setState({input_type: 'url'})
                this.setState({ output: res.data })
                this.setState({ loading: false })
                this.setState({results: true})
                console.log(res.data);
            });
        console.log(this.state.output);
    }
    render() {
        return (
            <div>
                <Header />
                <IOWrapper 
                    handleURLSubmit={this.handleURLSubmit}
                    handlePTSubmit={this.handlePTSubmit}
                    loading={this.state.loading}
                />
                <Results 
                    results={this.state.output}
                    is_populated={this.state.results}
                    input_type={this.state.input_type}
                />
            </div>
        )
    }
}