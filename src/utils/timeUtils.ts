import dayjs from 'dayjs'

export const timeIntervalStr = (fromTime: number, toTime: number) => {
    return dayjs(toTime - fromTime).format('mm:ss')
}