
function createDiv(names,content) {
    const div = document.createElement('div')
    div.classList.add(...names)
    div.textContent = content
    return div
}

class Calendar {

    static selected = new Date()
    static day =  this.selected.getDate();
    static month = this.selected.getMonth()
    static year = this.selected.getFullYear()

    static months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    static eventsCustom = []

    static eventsDaily = [
        [['Free Skate','8am - 11pm']],
        [['Free Skate','4:15pm - 5pm'],['Adult Skate [18+]','6pm - 11pm']],
        [['Free Skate','4:15pm - 5pm'],['Adult Skate [18+]','6pm - 11pm']],
        [['Free Skate','4:15pm - 5pm'],['Adult Skate [18+]',' 6pm - 11pm']],
        [['Free Skate','4:15pm - 5pm'],['Adult Skate [18+]','6pm - 11pm']],
        [['Free Skate','4:15pm - 5pm'],['Adult Skate [18+]','6pm - 11pm']],
        [['Free Skate','8am - 10pm']]
    ]

    static selectDay(element) {
        UI.days.forEach(day => { 
        if (day.classList.contains('selected')) day.classList.remove('selected','Grit')})
        element.classList.add('selected','Grit')
        this.day = element.textContent
        this.selected = new Date(this.year,this.month,this.day)
        if (element.classList.contains('lastMonth')) { this.selected = new Date(this.year,this.month-1,this.day); this.lastMonth() }
        this.Info()
    }

    static nextMonth() {
        UI.Update()
        UI.days.forEach(day => {day.remove()})
        this.month++
        if (this.month > 11) {
            this.month = 0
            this.year++
        }
        Calendar.Generate(this.year, this.month)
    }

    static lastMonth() {
        UI.Update()
        UI.days.forEach(day => day.remove())
        this.month--
        if (this.month < 0) {
            this.month = 11
            this.year--
        }
        Calendar.Generate(this.year, this.month)
    }

    static Reset()  {
        this.selected = new Date()
        this.day =  this.selected.getDate();
        this.month = this.selected.getMonth()
        this.year = this.selected.getFullYear()
        UI.Update()
        UI.days.forEach(day => day.remove())
        this.Generate(this.year, this.month)
    }

    static Info() {
        Display.Change(Display.calendarMonth, this.months[this.month])
        Display.Change(Display.calendarDate, `${this.months[this.selected.getMonth()]} ${this.selected.getDate()}${["st","nd","rd"][((this.selected.getDate()+90)%100-10)%10-1]||"th"}`)
        Display.Change(Display.calendarYear, this.year)
        Display.Change(Display.calendarEvents, '')

        this.eventsDaily[this.selected.getDay()].forEach(events => events.forEach((event, isTime) => {
            Display.Update()
            isTime? Display.calendarEvent.append(createDiv(['time'],event)): Display.calendarEvents.append(createDiv(['event'],event))
        }))
    }

    static Generate(year,month) {
        
        this.Info()
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();

        for (let i = 1; i < lastDayOfMonth + 1; i++) {
            const date = new Date(year, month, i)

            if (date.getDate() == 1) for (let i = date.getDay() - 1; i > -1; i--)
                Display.calendarGrid.append(createDiv(['day','interface','lastMonth'],lastDayOfLastMonth - i))
            
            Display.calendarGrid.append(createDiv(date.setHours(0,0,0,0)==this.selected.setHours(0,0,0,0)?['selected','day','interface','Grit']:['day','interface'],date.getDate()))
        }

        UI.Update()
    }

}

class UI {
    static calendarMonthRight = document.querySelector('.Calendar .right.interface')
    static calendarMonthLeft = document.querySelector('.Calendar .left.interface')
    static days = document.querySelectorAll('.Calendar .day.interface')
    static reset = document.querySelector('.Calendar .reset.interface')

    static Initialize() {
        this.calendarMonthLeft.addEventListener('click', () => Calendar.lastMonth())
        this.calendarMonthRight.addEventListener('click', () => Calendar.nextMonth())
        this.reset.addEventListener('click', () => Calendar.Reset())
    }

    static Update() {
        this.days = document.querySelectorAll('.Calendar .day.interface')
        this.days.forEach(day => day.addEventListener('click', () => Calendar.selectDay(day)))
    }
}

class Display {
    static calendarGrid = document.querySelector('.Calendar .grid')
    static calendarMonth = document.querySelector('.Calendar .month')
    static calendarInfo = document.querySelector('.Calendar .info')
    static calendarDate = document.querySelector('.Calendar .date')
    static calendarYear = document.querySelector('.Calendar .year')
    static calendarEvents = document.querySelector('.Calendar .events')
    static calendarEvent = document.querySelector('.Calendar .events .event:last-child')

    static Change(element,content) {
        element.textContent = content
    }

    static Update() {
        this.calendarEvent = document.querySelector('.Calendar .events .event:last-child')
    }
}

Calendar.Generate(Calendar.year, Calendar.month)
UI.Initialize()
