import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Owners from './Owners';
import Title from './Tournament/Title';
// import ReactMarkdown from 'react-markdown';

export type TournamentProps = {
  id: number;
  name: string;
  description: string;
  teamSize: number;
  players: {
    id: number;
    name: string;
    email: string;
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
    <h2>
      <Title name={tournament.name} teamSize={tournament.teamSize} />
    </h2>
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
