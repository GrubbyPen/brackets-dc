import { useState, useEffect } from 'react';
import Empty from '../Empty';
import Teams from './Teams';

interface Props {
  tournamentId: number;
  players: { id: number; name: string }[];
  teams: { id: number; name: string }[];
  teamSize: number;
  userHasValidSession: boolean;
}

interface Player {
  id: number;
  name: string;
}

const Players: React.FC<Props> = ({ tournamentId, players, teams, teamSize, userHasValidSession }) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [updatedPlayers, setUpdatedPlayers] = useState(players);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const body = { tournamentId, name };
      const res = await fetch(`/api/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Player;
      setUpdatedPlayers([...updatedPlayers, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setName('');
    }
  };

  return (
    <div>
      <h3>Players</h3>
      <form onSubmit={handleSubmit}>
        <input autoFocus onChange={e => setName(e.target.value)} placeholder="Name" type="text" value={name} />
        <div></div>
        <input disabled={!name || submitting || !userHasValidSession} type="submit" value="Create" />

        <a className="back" href="#" onClick={() => setName('')}>
          or Cancel
        </a>
      </form>
      <style jsx>{`
        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
      {updatedPlayers && updatedPlayers.length > 0 ? (
        <>
          <ol>
            {updatedPlayers.map(player => (
              <li key={player.id}>
                <div>
                  {player.name}
                  {/* <Link to={`/player/${player.id}`}>{player.name}</Link> */}
                  &nbsp;
                </div>
              </li>
            ))}
          </ol>
          <Teams tournamentId={tournamentId} teamSize={teamSize} teams={teams} playersCount={updatedPlayers.length} />
        </>
      ) : (
        <Empty>&#10024; Post the first player &#10024;</Empty>
      )}
    </div>
  );
};

export default Players;
