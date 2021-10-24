/**
 * Return informations about a message
 * (Command instance with input parameters)
 * Thanks to https://github.com/Shinobu1337/discord-command-parser/blob/master/src/regexps.js for regular expressions
 */

// Imports
import { Client } from '../'
import { Message } from 'discord.js'
import { CommandRequest, CommandRequestError } from '../model/CommandRequest'

// Exports regular expression validators
export const regExpValidators = {
    commandIdentifier: (prefix, names) => new RegExp(`^${prefix}(${names.sort((a, b) => b.length - a.length).join('|')})\s?(.+)?`),
    retrieveArgs: new RegExp(/"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|```((.|\s)*?)```|\S+/g),
    escapeQuotes: new RegExp(/^"|"$|^'|'$|^```(\S*\n?)|```$/g)
}

// Method
export async function queryParser(
    client: Client,
    message: Message
): Promise<CommandRequest> {
    const request = new CommandRequest()
    const commandIdentifier = regExpValidators.commandIdentifier(
        client.settings.prefix,
        client.registry.command.getNames()
    )

    // Check if it's a registered command
    if (!commandIdentifier.test(message.content)) {
        request.error = CommandRequestError.UNDEFINED_COMMAND
        return request
    }

    // Retrieve command name and args list
    const [, reqCommand, reqArgs] = message.content.match(commandIdentifier)
    const reqArgsList = reqArgs === undefined ? [] : reqArgs
        .match(regExpValidators.retrieveArgs)
        .map(arg => arg.replace(regExpValidators.escapeQuotes, ''))

    // Check if the command exists
    const cmdInstance = client.registry.command.get(reqCommand)
    if (cmdInstance === null) {
        request.error = CommandRequestError.UNDEFINED_COMMAND
        return request
    }

    // Setting: userIds, channelIds, roleIds
    const userNotAllowed = cmdInstance.settings.userIds && !cmdInstance.settings.userIds.includes(message.author.id)
    const channelNotAllowed = cmdInstance.settings.channelIds && !cmdInstance.settings.channelIds.includes(message.channel.id)
    const roleNotAllowed = cmdInstance.settings.roleIds && (!message.member || !cmdInstance.settings.roleIds.filter(roleId => message.member.roles.has(roleId)).length)

    if (userNotAllowed || channelNotAllowed || roleNotAllowed) {
        request.error = CommandRequestError.NOT_ALLOWED
        return request
    }

    // Retrieve parameters
    const cmdArgs = { requestContent: reqArgs }
    if (Array.isArray(cmdInstance.settings.args)) {
        // Check if we have enough args
        const optionalArgs = cmdInstance.settings.args.filter(arg => arg.isOptional)
        const argNbs = cmdInstance.settings.args.length
        const requiredArgsNb = argNbs - optionalArgs.length

        if (requiredArgsNb > reqArgsList.length) {
            request.error = CommandRequestError.NOT_ENOUGH_ARGS
        } else {
            // Save and check args
            const checks = await Promise.all(cmdInstance.settings.args.map(async (arg, i) => {
                const _arg = reqArgsList[i] || arg.default
                if (_arg === undefined && arg.isOptional) return
                const typedArg = await arg.type.call(client, _arg)
                if (arg.validator) {
                    const [ isSuccess, errorMsg ] = await arg.validator.call(client, typedArg)
                    if (!isSuccess) {
                        request.error = CommandRequestError.INVALID_ARG
                        request.validatorError = errorMsg
                    }
                }
                cmdArgs[arg.name] = typedArg
            }))
        }
    }

    // Update and return request
    request.command = cmdInstance
    request.args = cmdArgs
    return request
}
