import React, { Component } from 'react';
import './index.scss';

class SideBar extends Component {
    render() {
        let links = this.props.links.map( link => {
            let href = `${this.props.base_url}/${this.props.resource}/${link.id}`;
            return (
                <li className="list-component--list" key={link.id}>
                    <a className="list-component--link" href={href}
                       data-name={link.name} data-email={link.email} data-brith_date={link.birth_date}>
                        {link.name}
                    </a>
                </li>
            )
        });

        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>SW</h3>
                </div>
                <ul className="list-unstyled list-component">
                    <p className="list-component--title">{this.props.title}</p>
                    { links }
                </ul>
            </nav>
        );
    }
}

export default SideBar;
