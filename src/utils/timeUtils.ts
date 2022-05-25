import moment from "moment"

export const getTime = (time?: number) => {
    if (!time) {
        return ""
    }
    return moment(time * 1000).fromNow()
}