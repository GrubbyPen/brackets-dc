import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  const doubles = 2;
  const [name, setTitle] = useState('');
  const [teamSize, setTeamSize] = useState(doubles);
  const [description, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const body = { name, description, teamSize };
      await fetch(`/api/tournament`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Tournament</h1>
          <input autoFocus onChange={e => setTitle(e.target.value)} placeholder="Name" type="text" value={name} />
          <textarea
            cols={50}
            onChange={e => setContent(e.target.value)}
            placeholder="Description (can use markdown!)"
            rows={8}
            value={description}
          />
          <input
            onChange={e => setTeamSize(Number(e.target.value))}
            placeholder="TeamSize"
            type="number"
            value={teamSize}
          />
          <input disabled={!description || !name || submitting} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

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
    </Layout>
  );
};

export default Draft;
