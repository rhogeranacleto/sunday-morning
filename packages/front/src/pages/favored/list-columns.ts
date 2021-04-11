import { GridColumns } from '@material-ui/data-grid';

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
    valueGetter: (params) => (params.getValue('bank') as { code: string }).code,
  },
  {
    field: 'agency',
    headerName: 'Agência',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
  {
    field: 'bankAccount',
    headerName: 'CC',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
  {
    field: 'draft',
    headerName: 'Status do favorecido',
    flex: 1,
    sortable: false,
    disableClickEventBubbling: true,
  },
];
