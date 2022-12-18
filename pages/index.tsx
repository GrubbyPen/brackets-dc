import React from 'react';
import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Tournament, { TournamentProps } from '../components/Tournament';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const tournaments = await prisma.tournament.findMany({
    include: { players: true, owners: { select: { id: true, name: true, email: true } }, teams: true },
  });
  return {
    props: { tournaments: JSON.parse(JSON.stringify(tournaments)) },
  };
};

type Props = {
  tournaments: TournamentProps[];
};
const Tournaments: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Tournaments</h1>
        <main>
          {props.tournaments.map(tournament => (
            <div key={tournament.id} className="tournament">
              <Tournament tournament={tournament} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .tournament {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .tournament:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .tournament + .tournament {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Tournaments;
