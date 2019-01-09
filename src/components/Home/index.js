import React, { Component } from 'react';
import './index.scss'

import SideBar from '../SideBar';
import PublicationList from '../PublicationList'

class Home extends Component {
    static api_url = `${process.env.REACT_APP_API_URL}`;

    state = {
        authors: [],
        publications: []
    };

    componentWillMount() {
        let author_url = `${Home.api_url}/authors`;
        fetch(author_url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    authors: data
                })
            })
            .catch(error => {
                alert(error)
            });

        let publications_url = `${Home.api_url}/publications`;
        fetch(publications_url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    publications: data
                })
            })
            .catch(error => {
                alert(error)
            })
    }

    render() {
        return (
            <div className="App wrapper toggled">
                <div className="sidebar-wrapper">
                    <SideBar title="Authors" links={this.state.authors} resource="authors" base_url={Home.api_url} />
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <PublicationList publications={this.state.publications}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
