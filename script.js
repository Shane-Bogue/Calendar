let calendarGrid = document.querySelector('.Calendar .grid')

function daysOfMonth(year, month) {
    const lastDayOfMonth = new Date(year, month , 0).getDate();
    for (let i = 1; i < lastDayOfMonth + 1; i++) {
        const container = document.createElement('div')
        const dateObj = new Date(year, month - 1, i)
        const dayNumber = dateObj.getDate();
        const dayName = dateObj.toLocaleString('en-us', {weekday:'long'}).substring(0,3)
        container.append(dayName, dayNumber)
        calendarGrid.append(container)
    }
}
daysOfMonth(2023, 3)