export const defineDuration = (runtime: number) => {
    let result = ''
    const hours = Math.floor(runtime / 60)
    if (hours > 0)
        result += hours + 'h'

    const calcMinutes = runtime - hours * 60
    return result += ' ' + calcMinutes + 'm'
}