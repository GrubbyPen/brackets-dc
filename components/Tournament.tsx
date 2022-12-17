import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Owners from './Owners';
// import ReactMarkdown from 'react-markdown';

export type TournamentProps = {
  id: number;
  name: string;
  description: string;
  players: {
    id: number;
    name: string;
  }[];
  owners: {
    id: number;
    name: string;
    email: string;
  }[];
};

const Tournament: React.FC<{ tournament: TournamentProps }> = ({ tournament }) => (
  /* const authorName = tournament.author ? tournament.author.name : 'Unknown author';*/ <div
    onClick={() => Router.push('/p/[id]', `/p/${tournament.id}`)}
  >
    <h2>{tournament.name}</h2>
    {tournament.owners.length > 0 ? (
      <small>
        By <Owners owners={tournament.owners} />
      </small>
    ) : (
      <small>No Owner</small>
    )}

    <ReactMarkdown children={tournament.description} />
    <style jsx>{`
      div {
        color: inherit;
        padding: 2rem;
      }
    `}</style>
  </div>
);

export default Tournament;
