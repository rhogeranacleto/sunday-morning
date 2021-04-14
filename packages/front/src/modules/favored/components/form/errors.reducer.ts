const FIELDS = [
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

export const errorsReducer = (
  state: { [key: string]: string | boolean },
  action: string[],
) =>
  FIELDS.reduce((currentState, field) => {
    const messageError = action.find((error) => error.includes(field));

    return { ...currentState, [field]: messageError ?? false };
  }, state);
