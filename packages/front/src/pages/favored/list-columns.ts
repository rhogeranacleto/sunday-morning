import { GridColumns } from '@material-ui/data-grid';

export const COLUMNS: GridColumns = [
  { field: 'name', headerName: 'Favorecido', flex: 1 },
  { field: 'cpf_cnpj', headerName: 'CPF / CNPJ', flex: 1 },
  {
    field: 'bankImage',
    headerName: 'Banco',
    flex: 1,
    valueGetter: (params) => (params.getValue('bank') as { code: string }).code,
  },
  { field: 'agency', headerName: 'Agência', flex: 1 },
  { field: 'bankAccount', headerName: 'CC', flex: 1 },
  { field: 'draft', headerName: 'Status do favorecido', flex: 1 },
];
