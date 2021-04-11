import { ENVIRONMENT } from '../../env';

export const getAll = async (skip: number, search: string) => {
  const params = new URLSearchParams({
    skip: skip.toString(),
    take: '10',
    search,
  });

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

export const create = async (payload: Record<string, unknown>) => {
  const res = await fetch(`${ENVIRONMENT.url}/favored`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();

    throw error;
  }
};
