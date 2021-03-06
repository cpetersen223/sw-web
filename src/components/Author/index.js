import React, { Component, Fragment } from 'react';
import './index.scss';

import PublicationList from '../PublicationList';
import { NavLink } from "react-router-dom";
import RequestService from '../../requestService';

class Author extends Component {
  static api_url = `${process.env.REACT_APP_API_URL}`;

  state = {
    author: undefined
  };


  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const author_url = `${Author.api_url}/authors/${id}`;

    RequestService.get(author_url)
      .then(({ json }) => {
        this.setState({ author: json });
      });
  }


  render() {
    const { author } = this.state;
    const authorTemplate = author ? this.template() : 'Loading...';

    return (
      <div className="App wrapper">
        <div className="page-content-wrapper">
          <NavLink to="/" className="btn btn-primary">
            Home
          </NavLink>
          <div className="container-fluid">
            {  authorTemplate }
          </div>
        </div>
      </div>
    );
  }


  template() {
    const { name, email, birth_date, publications } = this.state.author;
    const reverseButton = publications ? this.reverseButtonTemplate() : '';

    return (
      <Fragment>
        <h1 className="text-center">{name}</h1>
        <h3 className="text-center">{email}</h3>
        <h3 className="text-center">{birth_date}</h3>
        <div className="row justify-content-center">
          <PublicationList publications={publications}/>
        </div>
        { reverseButton }
      </Fragment>
    )
  }


  reverseButtonTemplate() {
    return (
      <button className={"btn btn-primary reverse-btn"} onClick={this.handleReverse}>
        Reverse
      </button>
    )
  }


  handleReverse = () => {
    this.setState({
      publications: this.state.author.publications.reverse()
    })
  }

}

export default Author;
