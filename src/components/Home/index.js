import React, { Component } from 'react';
import './index.scss';

import SideBar from '../SideBar';
import RequestService from '../../requestService';
import parseLink from 'parse-link-header';
import PublicationList from '../PublicationList';

class Home extends Component {
    static api_url = `${process.env.REACT_APP_API_URL}`;

    state = {
        publications: [],
        links: undefined,
        next: undefined,
        prev: undefined
    };

    componentDidMount() {
        const publications_url = `${Home.api_url}/publications`;

        RequestService.get(publications_url)
            .then(({ response, json }) => {
                this.parseLinkAndSetState(response, json);
            })
    }

    parseLinkAndSetState (response, json) {
        const publications = json;
        const link = response.headers.get('Link');
        let links, state;

        if (link) {
            links = parseLink(link);
            let { next, prev } = links;
            next = next && next.url;
            prev = prev && prev.url;
            state = { publications, links, next, prev }
        } else {
            state = {
                publications,
                links: undefined,
                next: undefined,
                prev: undefined
            }
        }

        this.setState(state);
    }

    render() {
        const { publications, next, prev } = this.state;
        const publicationList = publications ? this.publicationListTemplate() : '';
        const nextButton = next ? this.nextButtonTemplate() : '';
        const prevButton = prev ? this.prevButtonTemplate() : '';
        const reverseButton = publications ? this.reverseButtonTemplate() : '';

        return (
            <div className="App wrapper toggled">
                <div className={"sidebar-wrapper"}>
                    <SideBar title="Authors" resource="authors" />
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Search by publication's name"
                                       aria-label="Recipient's username" aria-describedby="button-addon2"
                                       id="input-search" onKeyPress={this.handleSearchByEnter}
                                />
                                <div className="input-group-append">
                                    <button onClick={this.handleSearch} className="btn btn-outline-primary" type="button" id="button-addon2">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            { reverseButton }
                            { publicationList }
                            { prevButton }
                            { nextButton }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    publicationListTemplate() {
        return <PublicationList {...this.state}/>
    }

    nextButtonTemplate() {
        return (
            <a href={this.state.next} className={"btn btn-primary next-btn"} onClick={this.handleClick}>
                Next
            </a>
        )
    }

    prevButtonTemplate() {
        return (
            <a href={this.state.prev} className={"btn btn-primary prev-btn"} onClick={this.handleClick}>
                Prev
            </a>
        )
    }

    reverseButtonTemplate() {
        return (
            <button className={"btn btn-primary reverse-btn"} onClick={this.handleReverse}>
                Reverse
            </button>
        )
    }

    handleClick = e => {
        e.preventDefault();
        RequestService.get(e.target.href)
            .then(({ response, json }) => {
                this.parseLinkAndSetState(response, json);
            })
    };

    handleSearch = e => {
        e.preventDefault();
        const input = document.querySelector('#input-search');
        const publications_url = `${Home.api_url}/publications?q=${input.value}`;

        RequestService.get(publications_url)
            .then(({ response, json }) => {
                this.parseLinkAndSetState(response, json);
            })
    };

    handleSearchByEnter = e => {
        console.log(e.key, e);
        if (e.key === 'Enter') {
            this.handleSearch(e)
        }
    };

    handleReverse = () => {
        this.setState({
            publications: this.state.publications.reverse()
        })
    }
}

export default Home;
