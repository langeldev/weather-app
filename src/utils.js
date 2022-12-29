

export const rounded = (value) => Math.round(value)

export const getWeekDay = (day) => {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(day).getDay()]
}
  
