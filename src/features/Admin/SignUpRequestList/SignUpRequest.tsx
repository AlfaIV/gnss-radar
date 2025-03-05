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
    CircularProgress,
  } from '@mui/material'
  import { memo, forwardRef } from 'react'
  import DoneIcon from '@mui/icons-material/Done'
  import CloseIcon from '@mui/icons-material/Close'
  import { ResolveSignUpRequest, SignUpRequestProps } from '~/shared/typings/user/userTypings'
import { ROLES } from '~/shared/config/constants'
import { useMutation } from '@tanstack/react-query'
import useService from '~/entities/useService'
import { useQueryClient } from '@tanstack/react-query'
  
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
      const { name, surname, login, email, organizationName, role } = props

      const { resolveSignUp } = useService();

      const queryClient = useQueryClient();

      const { mutateAsync: makeResolution, isPending } = useMutation({
        mutationKey: ['update-role'],
        mutationFn: (values: ResolveSignUpRequest) => 
          resolveSignUp(values),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['signup-resolution'] })
        }
      })

      const handleMakeResolution = async (resolution: 'APPROVED' | 'DECLINED') => {
        try {
          await makeResolution({ login, resolution })
        } catch (e) {
          console.error('Role change failed:', e)
        }
      }
  
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

              <StyledTableRow>
                <StyledTableCell sx={{ verticalAlign: 'top' }}>
                  <Typography fontWeight='bold'>Организация</Typography>
                </StyledTableCell>
                <StyledTableCell>{organizationName}</StyledTableCell>
              </StyledTableRow>

              <StyledTableRow>
                <StyledTableCell sx={{ verticalAlign: 'top' }}>
                  <Typography fontWeight='bold'>Роль</Typography>
                </StyledTableCell>
                <StyledTableCell>{ROLES.find(item => item.value === role)?.label}</StyledTableCell>
              </StyledTableRow>

            </TableBody>
          </Table>
          <Box display='flex' width='100%' justifyContent='space-around'>
{!isPending &&           (<><Tooltip title='Согласовать'>
              <IconButton onClick={()=>handleMakeResolution('APPROVED')}>
                <DoneIcon sx={{ color: 'green', fontSize: '32px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Отклонить'>
              <IconButton onClick={()=>handleMakeResolution('DECLINED')}>
                <CloseIcon sx={{ color: 'red', fontSize: '32px' }} />
              </IconButton>
            </Tooltip></>)}
            {isPending && <CircularProgress size={'32px'}/>}
          </Box>
        </Box>
      )
    })
  )
    
  export default SignUpRequest