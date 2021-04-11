import { Box, Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import { IFavored } from './interfaces';
import * as favoredService from './service';

interface IFavoredViewProps {
  favored: IFavored;
  closeModal: () => void;
}

export const FavoredView = ({ favored, closeModal }: IFavoredViewProps) => {
  const [email, setEmail] = useState(favored.email);
  const [error, setError] = useState('');

  const upsert = async () => {
    try {
      await favoredService.upsert({
        ...favored,
        email,
      });
    } catch (e) {
      if (e.statusCode === 422) {
        setError(e.message[0]);
      }
    }
  };

  const remove = async () => {
    await favoredService.deleteMany([favored.id as string]);
  };

  return (
    <Box>
      {favored.name}
      {favored.draft ? 'Rascunho' : 'Validado'}
      {favored.cpf_cnpj}
      {favored.bank.name}
      {favored.agency}-{favored.agencyDigit}
      {favored.bankAccountType}
      {favored.bankAccount}-{favored.bankAccountDigit}
      <TextField
        id="favored-email"
        label="Qual o e-mail do favorecido?"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(error)}
        helperText={error}
      />
      <Button onClick={closeModal}>Voltar</Button>
      <Button onClick={remove}>Lixeira</Button>
      <Button onClick={upsert}>Salvar</Button>
    </Box>
  );
};