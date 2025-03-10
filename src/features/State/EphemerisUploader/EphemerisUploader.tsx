import React, { useState, useRef } from 'react'
import {
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  Alert,
  Box,
} from '@mui/material'
import { UploadFile, Delete } from '@mui/icons-material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '~/shared/config/constants'
import useService from '~/entities/useService'
import { useFileContext } from '../context/StateContext'

const EphemerisUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploadEphemeris } = useService();

  const {setHasLoadedFile} = useFileContext();

  const queryClient = useQueryClient()

  const { mutateAsync: uploadFile, isPending } = useMutation({
    mutationKey: ['upload-ephemeris'],
    mutationFn: (file: File) => uploadEphemeris(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ephemeris'] })
    },
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = event.target.files?.[0]

    if (!file) return

    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      setError(
        `Неверный тип файла. Разрешенные типы: ${ALLOWED_FILE_TYPES.join(', ')}`,
      )
      return
    }

    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      setError(`Ограничение размера файла ${MAX_FILE_SIZE}МБ`)
      return
    }

    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      setError(null)
      await uploadFile(selectedFile)
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setHasLoadedFile(true)
    } catch (err) {
      setError('Не удалось загрузить файл. Попробуйте позже')
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Stack spacing={2}>
        <Typography variant='h6' gutterBottom>
          Загрузка файла эфемерид
        </Typography>

        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept={ALLOWED_FILE_TYPES.join(',')}
          hidden
        />

        <Button
          variant='contained'
          component='label'
          startIcon={<UploadFile />}
          disabled={isPending}
        >
          Выбрать файл
          <input type='file' hidden onChange={handleFileSelect} />
        </Button>

        {selectedFile && (
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='body2'>
              Выбрано: {selectedFile.name} (
              {Math.round(selectedFile.size / 1024)} KB)
            </Typography>
            <IconButton
              size='small'
              onClick={handleRemoveFile}
              disabled={isPending}
            >
              <Delete fontSize='small' />
            </IconButton>
          </Stack>
        )}

        {isPending && <LinearProgress />}

        {error && <Alert severity='error'>{error}</Alert>}

        <Button
          variant='outlined'
          color='primary'
          onClick={handleUpload}
          disabled={!selectedFile || isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? 'Загрузка...' : 'Загрузить'}
        </Button>
      </Stack>
    </Box>
  )
}

export default EphemerisUploader
