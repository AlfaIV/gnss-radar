import { useCallback, useMemo } from 'react'

import axiosInstance from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'
import {
  CreateTaskRequest,
  GetTasksResponseType,
  UpdateTaskRequest,
} from '~/shared/typings/tasks/tasks'
import { PaginatedQueryType } from '~/shared/typings/common/common'

const useTasksService = () => {
  const createTask = useCallback(
    async (values: CreateTaskRequest, signal?: AbortSignal): Promise<void> => {
      await axiosInstance.post(
        API_URLS.TASKS.CREATE_TASK,
        {
          ...values,
        },
        {
          signal,
        },
      )
    },
    [],
  )

  const getTasks = useCallback(
    async (
      values: PaginatedQueryType,
      signal?: AbortSignal,
    ): Promise<GetTasksResponseType> => {
      const response: GetTasksResponseType = await axiosInstance.get(
        API_URLS.TASKS.GET_TASKS,
        {
          signal,
          params: {
            ...values,
          },
        },
      )

      return response
    },
    [],
  )

  const deleteTask = useCallback(
    async (id: string, signal?: AbortSignal): Promise<void> => {
      await axiosInstance.post(
        API_URLS.TASKS.DELETE_TASK,
        {
          id,
        },
        {
          signal,
        },
      )
    },
    [],
  )

  const updateTask = useCallback(
    async (values: UpdateTaskRequest, signal?: AbortSignal): Promise<void> => {
      await axiosInstance.put(
        API_URLS.TASKS.UPDATE_TASK,
        {
          ...values,
        },
        {
          signal,
        },
      )
    },
    [],
  )

  return useMemo(
    () => ({
      createTask,
      getTasks,
      updateTask,
      deleteTask,
    }),
    [createTask, getTasks, updateTask, deleteTask],
  )
}

export default useTasksService
