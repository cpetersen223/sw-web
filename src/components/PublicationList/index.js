import React, { Component } from 'react';
import './index.scss'

class PublicationList extends Component {
    render() {
        return this.props.publications.map( publication => {
            let date = new Date(publication.date).toLocaleString();
            return (
                <div className="col-8 p-2" key={publication.id}>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title text-center">{publication.title}</h5>
                            <h6 className="card-subtitle text-center">{publication.author.name}</h6>
                            <p className="card-text">{publication.body}</p>
                            <h6 className="card-subtitle text-right">{date}</h6>
                        </div>
                    </div>
                </div>
            )
        });
    }
}

export default PublicationList;
