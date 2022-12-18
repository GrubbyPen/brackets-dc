import { useState, useEffect } from 'react';
import Empty from '../Empty';

interface Props {
  name: string;
  teamSize: number;
}

const Title: React.FC<Props> = ({ name, teamSize }) => {
  let size = 'Team';
  switch (teamSize) {
    case 1:
      size = 'Singles';
      break;
    case 2:
      size = 'Doubles';
      break;
    case 3:
      size = 'Triples';
      break;
    case 4:
      size = 'Quads';
      break;
  }
  return (
    <div>
      {`${name} `}
      <small>({size})</small>
    </div>
  );
};

export default Title;
