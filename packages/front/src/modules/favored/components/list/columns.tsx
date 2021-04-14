import { Avatar } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { IBank } from '../../../bank/interfaces';
import { StatusChips } from '../status-chips.component';

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
    field: 'bank',
    headerName: 'Banco',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => (
      <Avatar alt="Remy Sharp" src={(params.value as IBank).icon} />
    ),
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
    renderCell: (params) => <StatusChips draft={params.value as boolean} />,
  },
];
