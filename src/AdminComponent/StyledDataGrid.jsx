import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: '#1d1d1d',
        ...theme.applyStyles('light', {
            backgroundColor: '#fafafa',
        }),
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: '1px solid #303030',
        ...theme.applyStyles('light', {
            borderRightColor: '#f0f0f0',
        }),
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: '1px solid #303030',
        ...theme.applyStyles('light', {
            borderBottomColor: '#f0f0f0',
        }),
    },
    '& .MuiDataGrid-cell': {
        color: 'rgba(255,255,255,0.65)',
        ...theme.applyStyles('light', {
            color: 'rgba(0,0,0,.85)',
        }),
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '& .MuiDataGrid-footerContainer': {
        display: 'none'
    },

    ...theme.applyStyles('light', {
        color: 'rgba(0,0,0,.85)',
    }),
}));