import { ENVIRONMENT } from '../../env';

export const getAll = async (skip: number) => {
  const params = new URLSearchParams({ skip: skip.toString(), take: '10' });

  const res = await fetch(`${ENVIRONMENT.url}/favored?${params}`);

  return res.json();
};

export const deleteMany = async (ids: string[]) => {
  await fetch(`${ENVIRONMENT.url}/favored`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
};
