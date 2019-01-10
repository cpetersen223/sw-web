import React, { Component } from 'react';
import './index.scss';

import { NavLink } from 'react-router-dom'
import RequestService from '../../requestService';

class SideBar extends Component {
  static api_url = `${process.env.REACT_APP_API_URL}`;
  
  state = {
    authors: []
  };
  
  componentDidMount() {
    const authors_url = `${SideBar.api_url}/authors/`;
    
    RequestService.get(authors_url)
      .then(({ json }) => {
        this.setState({ authors: json });
      });
    
  }
  
  render() {
    const { authors } = this.state;
    const { resource, title } = this.props;
    
    const links = authors ? authors.map( link => {
      const { id, name } = link;
      const href = `/${resource}/${id}`;
      
      return (
        <li className="list-component--list" key={id}>
          <NavLink to={href} className="list-component--link" activeClassName="active">
            { name }
          </NavLink>
        </li>
      )
      
    }) : 'Loading...';
    
    
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>SW</h3>
        </div>
        <ul className="list-unstyled list-component">
          <p className="list-component--title">{title}</p>
          { links }
        </ul>
      </nav>
    )
    
  }
}

export default SideBar;
