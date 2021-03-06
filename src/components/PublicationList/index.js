import React from 'react';
import Publication from '../Publication';

const PublicationList = props => {
  const { publications } = props;
  
  return (
    publications.length > 0 ? (publications.map(
      publication => {
        return <Publication key={publication.id} publication={publication}/>
      })
    ) : <h5>Publications not found</h5>
  )
  
};

export default PublicationList;
