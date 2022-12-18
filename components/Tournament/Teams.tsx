import { useState, useEffect } from 'react';

interface Props {
  tournamentId: number;
  teams: { id: number; name: string }[];
  teamSize: number;
  playersCount: number;
  userHasValidSession: boolean;
}

interface Team {
  id: number;
  name: string;
}

const Teams: React.FC<Props> = ({ tournamentId, teams, teamSize, playersCount, userHasValidSession }) => {
  const [updatedTeams, setUpdatedTeams] = useState(teams);
  const [submitting, setSubmitting] = useState(false);

  const showCreateTeams = userHasValidSession && playersCount >= teamSize * 2;
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const body = { tournamentId };
      const res = await fetch(`/api/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as Team[];
      setUpdatedTeams(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {teamSize > 1 ? (
        <>
          {showCreateTeams && (
            <>
              <form onSubmit={handleSubmit}>
                <input disabled={submitting} type="submit" value="Create" />
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
            </>
          )}
          {updatedTeams.length > 1 ? (
            <div>
              <h3>Teams</h3>
              <ol>
                {updatedTeams.map(team => (
                  <li key={team.id}>
                    <div>
                      <h2>
                        {team.name}
                        {/* <Link to={`/team/${team.id}`}>{team.name}</Link> */}
                      </h2>
                      &nbsp;
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default Teams;
