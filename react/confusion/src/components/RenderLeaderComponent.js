import React from 'react';
import {Media} from 'reactstrap';

const RenderLeader = ({leader}) => (
    <Media className="mb-5">
      <Media left href="#">
        <Media object src={leader.image} alt={leader.name} />
      </Media>
      <Media body className="ml-5">
        <Media heading>
          {leader.name}
        </Media>
        <p>{leader.designation}</p>
        <p>{leader.description}</p>
      </Media>
    </Media>
);
export default RenderLeader;
