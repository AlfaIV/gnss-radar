import {
    Box,
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    styled,
    IconButton,
    Tooltip,
  } from '@mui/material'
  import { memo, forwardRef } from 'react'
  import DoneIcon from '@mui/icons-material/Done'
  import CloseIcon from '@mui/icons-material/Close'
  import { SignUpRequestProps } from '~/shared/typings/user/userTypings'
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    borderBottom: 'none',
  }))
  
  const SignUpRequest = memo(
    forwardRef<HTMLDivElement, SignUpRequestProps>((props, ref) => {
      const { name, surname, login, email } = props
  
      return (
        <Box
          ref={ref}
          sx={{
            border: '2px solid black',
            padding: 2,
            borderRadius: 5,
            minWidth: '300px',
            maxWidth: '300px',
            wordWrap: 'break-word',
          }}
        >
          <Table size='small'>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    width: '40%',
                    verticalAlign: 'top',
                  }}
                >
                  <Typography fontWeight='bold'>Имя</Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '60%',
                  }}
                >
                  {name}
                </StyledTableCell>
              </StyledTableRow>
  
              <StyledTableRow>
                <StyledTableCell
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    verticalAlign: 'top',
                  }}
                >
                  <Typography fontWeight='bold'>Фамилия</Typography>
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {surname}
                </StyledTableCell>
              </StyledTableRow>
  
              <StyledTableRow>
                <StyledTableCell sx={{ verticalAlign: 'top' }}>
                  <Typography fontWeight='bold'>Логин</Typography>
                </StyledTableCell>
                <StyledTableCell>{login}</StyledTableCell>
              </StyledTableRow>
  
              <StyledTableRow>
                <StyledTableCell sx={{ verticalAlign: 'top' }}>
                  <Typography fontWeight='bold'>Email</Typography>
                </StyledTableCell>
                <StyledTableCell>{email}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <Box display='flex' width='100%' justifyContent='space-around'>
            <Tooltip title='Согласовать'>
              <IconButton>
                <DoneIcon sx={{ color: 'green', fontSize: '32px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Отклонить'>
              <IconButton>
                <CloseIcon sx={{ color: 'red', fontSize: '32px' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )
    })
  )
    
  export default SignUpRequest