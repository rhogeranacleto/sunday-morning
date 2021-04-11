import { Button, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useEffect, useReducer, useState } from 'react';
import * as bankService from '../bank/service';
import * as favoredService from './service';

interface IBank {
  code: string;
  name: string;
}

const errorsReducer = (
  state: { [key: string]: string | boolean },
  action: string[],
) => {
  const fields = [
    'name',
    'cpf_cnpj',
    'email',
    'bank',
    'agency',
    'agencyDigit',
    'bankAccountType',
    'bankAccount',
    'bankAccountDigit',
  ];

  for (const field of fields) {
    const messageError = action.find((error) => error.includes(field));

    state = { ...state, [field]: messageError ?? false };
  }

  return state;
};

export const NewFavored = () => {
  const [name, setName] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [bank, setBank] = useState<IBank>();
  const [agency, setAgency] = useState('');
  const [agencyDigit, setAgencyDigit] = useState('');
  const [bankAccountType, setBankAccountType] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAccountDigit, setBankAccountDigit] = useState('');
  const [banks, setBanks] = useState<IBank[]>([]);
  const [accountTypes, setAccountTypes] = useState<string[]>([]);
  const [errors, dispatchError] = useReducer(errorsReducer, {});

  useEffect(() => {
    Promise.all([bankService.getAll(), bankService.getAccountTypes()]).then(
      ([banksList, accountTypesList]) => {
        setBanks(banksList);
        setAccountTypes(accountTypesList);

        setBank(banksList[0]);
        setBankAccountType(accountTypesList[0]);
      },
    );
  }, []);

  const create = async () => {
    try {
      await favoredService.create({
        name,
        cpf_cnpj,
        email,
        bank,
        agency,
        agencyDigit,
        bankAccountType,
        bankAccount,
        bankAccountDigit,
      });
    } catch (e) {
      if (e.statusCode === 422) {
        dispatchError(e.message);
      }
    }
  };

  return (
    <div>
      quais os dados
      <TextField
        id="favored-name"
        label="Qual o nome completo ou razão social do favorecido?"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        id="favored-cpf"
        label="Qual o CPF ou CNPJ?"
        variant="outlined"
        value={cpf_cnpj}
        onChange={(e) => setCpfCnpj(e.target.value)}
        error={Boolean(errors.cpf_cnpj)}
        helperText={errors.cpf_cnpj}
      />
      <TextField
        id="favored-email"
        label="Qual o e-mail do favorecido?"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
      <Autocomplete
        id="favored-bank"
        options={banks}
        getOptionLabel={(option) => option.name}
        value={bank}
        onChange={(e, newValue) => setBank(newValue ?? undefined)}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label="Qual o banco do favorecido?"
            variant="outlined"
          />
        )}
      />
      <TextField
        id="favored-agency"
        label="Qual a agência?"
        variant="outlined"
        value={agency}
        onChange={(e) => setAgency(e.target.value)}
        error={Boolean(errors.agency)}
        helperText={errors.agency}
      />
      <TextField
        id="favored-agency-digit"
        label="Dígito"
        variant="outlined"
        value={agencyDigit}
        onChange={(e) => setAgencyDigit(e.target.value)}
        error={Boolean(errors.agencyDigit)}
        helperText={errors.agencyDigit}
      />
      <Autocomplete
        id="favored-account-type"
        options={accountTypes}
        getOptionLabel={(option) =>
          option
            .toLowerCase()
            .replace('_', ' ')
            .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
        }
        value={bankAccountType}
        onChange={(e, newValue) => newValue && setBankAccountType(newValue)}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            label="Qual o tipo da conta?"
            variant="outlined"
          />
        )}
      />
      <TextField
        id="favored-account"
        label="Qual a conta corrente?"
        variant="outlined"
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
        error={Boolean(errors.bankAccount)}
        helperText={errors.bankAccount}
      />
      <TextField
        id="favored-account-digit"
        label="Dígito"
        variant="outlined"
        value={bankAccountDigit}
        onChange={(e) => setBankAccountDigit(e.target.value)}
        error={Boolean(errors.bankAccountDigit)}
        helperText={errors.bankAccountDigit}
      />
      <Button>Cancelar</Button>
      <Button onClick={create}>Salvar</Button>
    </div>
  );
};
