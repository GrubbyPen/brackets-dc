import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { TournamentProps } from '../../components/Tournament';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';
import Owners from '../../components/Owners';
import Players from '../../components/Tournament/Players';
import Title from '../../components/Tournament/Title';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tournament = await prisma.tournament.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      players: { select: { id: true, name: true } },
      owners: { select: { id: true, name: true, email: true } },
      teams: { select: { id: true, name: true } },
    },
  });
  // console.log(JSON.parse(JSON.stringify(tournament)));
  return {
    props: JSON.parse(JSON.stringify(tournament)),
  };
};

async function publishTournament(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deleteTournament(id: number): Promise<void> {
  await fetch(`/api/tournament/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

const Tournament: React.FC<TournamentProps> = props => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const tournamentBelongsToUser = props.owners?.some(owner => owner.email === session?.user?.email);
  // if (!props.published) {
  //   title = `${title} (Draft)`;
  // }
  const playerProps = {
    players: props.players,
    tournamentId: props.id,
    teamSize: props.teamSize,
    teams: props.teams,
  };

  return (
    <Layout>
      <div>
        <h1>
          <Title name={props.name} teamSize={props.teamSize} />
        </h1>
        {/* <h2>{props.name}</h2> */}
        <p>
          By <Owners owners={props.owners} />
        </p>
        <ReactMarkdown children={props.description} />
        {/* {!props.published && userHasValidSession && tournamentBelongsToUser && (
          <button onClick={() => publishTournament(props.id)}>Publish</button>
        )} */}
        {userHasValidSession && tournamentBelongsToUser && (
          <button onClick={() => deleteTournament(props.id)}>Delete</button>
        )}
        <Players {...playerProps} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Tournament;
