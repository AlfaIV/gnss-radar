export type CreateTaskRequest = {
    id?: string
    name: string
    description: string
    datetimeStart: string
    datetimeEnd: string
    isAll: boolean
    satellites?: string[]
}

export type UpdateTaskRequest = {
    id: string
    name: string
    description: string
    datetimeStart: string
    datetimeEnd: string
    isAll: boolean
    satellites?: string[]
}

export type TaskCreateDialogProps = {
    onClose: () => void
    open: boolean
}

export type TaskDeleteDialogProps = {
    onClose: () => void
    open: boolean
    id: string
    name: string
}

export type TaskFeedItemProps = {
    id?: string
    name: string
    description: string
    datetimeStart: string
    datetimeEnd: string
    isAll: boolean
    satellites?: string[]
    userName: string
    surname: string
    email: string
    organizationName: string
}

export type TaskUpdateDialogProps = {
    id?: string
    name: string
    description: string
    datetimeStart: string
    datetimeEnd: string
    isAll: boolean
    satellites?: string[]
    open: boolean
    onClose: () => void
}

export type GetTasksResponseType = {
    data: {
        tasks: {
            id?: string
            name: string
            description: string
            datetimeStart: string
            datetimeEnd: string
            isAll: boolean
            satellites?: string[]
            userName: string
            surname: string
            email: string
            organizationName: string
        }[]
    }
}