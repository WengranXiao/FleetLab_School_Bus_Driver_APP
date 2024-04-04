const getInitials = (name) => {
    return name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
}

const stringToColour = (str) => {
    let hash = 0;
    str = str + '2'
    str.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff
        colour += value.toString(16).padStart(2, '0')
    }
    return colour
}

const delay = (ms) => new Promise(
    resolve => setTimeout(resolve, ms)
);

const getFutureDates = (num) => {
    let dates = [] // format: "2024-03-10"
    let today = new Date()
    // handle time zone difference
    const offset = today.getTimezoneOffset()
    today = new Date(today.getTime() - (offset * 60 * 1000))
    for (let i = 0; i < num; i++) {
        dates.push(today.toISOString().split('T')[0])
        today.setDate(today.getDate() + 1);
    }
    return dates
}

export { getInitials, stringToColour, delay, getFutureDates };