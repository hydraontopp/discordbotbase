interface QueenDecimSettings {
    token: string
    prefix: string
    ownerIds?: string[]
    throwErrorPM?: boolean
    throwErrorChannel?: boolean
}

interface CommandSettings {
    name: string
    group: string
    description: string
    details?: string
    args?: CommandSettingsParameter[]
    userIds?: string[]
    channelIds?: string[]
    roleIds?: string[]
}

interface CommandSettingsParameter {
    name: string
    type?: any
    validator?: (arg) => [boolean, string]
    isOptional?: boolean
    default?: any
}