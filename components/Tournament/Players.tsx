import { useState, useEffect } from 'react';
import Empty from '../Empty';

interface Props {
  tournamentId: number;
  players: { id: number; name: string }[];
}

interface Player {
  id: number;
  name: string;
}

const Players: React.FC<Props> = ({ tournamentId, players }) => {
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
        <input disabled={!name || submitting} type="submit" value="Create" />

        <a className="back" href="#" onClick={() => setName('')}>
          or Cancel
        </a>
      </form>
      {updatedPlayers && updatedPlayers.length > 0 ? (
        <>
          <ol>
            {updatedPlayers.map(player => (
              <li key={player.id}>
                <div>
                  <h2>
                    {player.name}
                    {/* <Link to={`/player/${player.id}`}>{player.name}</Link> */}
                  </h2>
                  &nbsp;
                </div>
              </li>
            ))}
          </ol>
          {/* <CreateTeams tournament_id={tournament_id} size={2} /> */}
        </>
      ) : (
        <Empty>&#10024; Post the first player &#10024;</Empty>
      )}
    </div>
  );
};

export default Players;
