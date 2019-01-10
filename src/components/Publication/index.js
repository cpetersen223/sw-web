import React from 'react';
import '../Publication/index.scss'

const Publication = (props) => {
  const { author, date, title, body } = props.publication;
  const formatDate = new Date(date).toLocaleString();
  const authorTemplate = author ? <h6 className="card-subtitle text-center">{author.name}</h6> : '';
  
  return (
    <div className="col-8 p-2">
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title text-center">{title}</h5>
          { authorTemplate }
          <p className="card-text">{body}</p>
          <h6 className="card-subtitle text-right">{formatDate}</h6>
        </div>
      </div>
    </div>
  )
  
};

export default Publication;
