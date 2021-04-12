import { Chip } from '@material-ui/core';

interface IStatusChipsProps {
  draft: boolean;
}

export const StatusChips = ({ draft }: IStatusChipsProps) => (
  <Chip
    label={draft ? 'Rascunho' : 'Validado'}
    color={draft ? undefined : 'primary'}
  />
);
