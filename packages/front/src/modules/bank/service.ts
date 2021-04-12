import { ENVIRONMENT } from '../../env';

export const getAll = async () => {
  const res = await fetch(`${ENVIRONMENT.url}/bank`);

  return res.json();
};

export const getAccountTypes = async (): Promise<string[]> => {
  const res = await fetch(`${ENVIRONMENT.url}/bank/account-types`);

  return res.json();
};
