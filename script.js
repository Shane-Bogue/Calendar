const calendarGrid = document.querySelector('.Calendar .grid')
const calendarInfo = document.querySelector(('.Calendar .info'))

function daysOfMonth(year, month) {
    const today = new Date()
    console.log(today.toLocaleString('default', { month: 'long' }))
    const lastDayOfMonth = new Date(year, month , 0).getDate();
    const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
    for (let i = 1; i < lastDayOfMonth + 1; i++) {
        const dateObj = new Date(year, month - 1, i)
        if (dateObj.getDate() == 1) for (let i = dateObj.getDay(); i > -1; i--) {
            const lastMonthDayContainer = document.createElement('div');
            lastMonthDayContainer.textContent = lastDayOfLastMonth - i
            calendarGrid.append(lastMonthDayContainer)
        } 
        const monthDayContainer = document.createElement('div')
        const dayNumber = dateObj.getDate();
        monthDayContainer.append(dayNumber)
        calendarGrid.append(monthDayContainer)
    }
}
daysOfMonth(2023, 9)