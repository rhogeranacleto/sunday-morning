import { Chip } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { IBank } from './interfaces';

export const COLUMNS: GridColumns = [
  {
    field: 'name',
    headerName: 'Favorecido',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
  {
    field: 'cpf_cnpj',
    headerName: 'CPF / CNPJ',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
  {
    field: 'bankImage',
    headerName: 'Banco',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
    valueGetter: (params) => (params.getValue('bank') as IBank).code,
  },
  {
    field: 'agency',
    headerName: 'Agência',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
  {
    field: 'CC',
    headerName: 'CC',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
    valueGetter: (params) =>
      `${params.getValue('bankAccount')}-${params.getValue(
        'bankAccountDigit',
      )}`,
  },
  {
    field: 'draft',
    headerName: 'Status do favorecido',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <Chip
        label={params.value ? 'Rascunho' : 'Validado'}
        color={params.value ? undefined : 'primary'}
      />
    ),
  },
];
