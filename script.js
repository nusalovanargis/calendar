const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.querySelector('.month-year');
const prevMonthButton = document.querySelector('.prev-month');
const nextMonthButton = document.querySelector('.next-month');
const selectedDateElem = document.querySelector('.selected-date');
const dayOfWeekElem = document.querySelector('.day-of-week');
const holidayInfoElem = document.querySelector('.holiday-info');
const upcomingHolidaysElem = document.querySelector('.upcoming-holidays .holiday');
const dateInfoElem = document.querySelector('.date-info');

let currentDate = new Date();

const holidays = {
    '1-7': 'Qurban bayrami',
    '1-18': 'Public Holiday',
    '1-26': 'Republic Day'
};

const renderCalendar = () => {
    calendarDates.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    monthYear.textContent = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        calendarDates.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = i;

        dateDiv.addEventListener('click', () => {
            const selectedDiv = document.querySelector('.calendar-dates .selected');
            if (selectedDiv) {
                selectedDiv.classList.remove('selected');
            }
            dateDiv.classList.add('selected');

            const selectedDate = new Date(year, month, i);
            const dayOfWeek = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = `${month + 1}-${i}`;
            selectedDateElem.textContent = `${selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })}`;
            dayOfWeekElem.textContent = dayOfWeek;
            holidayInfoElem.textContent = holidays[formattedDate] || 'No holiday';

            renderUpcomingHolidays(month, year, i);

            dateInfoElem.style.display = 'block';
        });

        calendarDates.appendChild(dateDiv);
    }
};

const renderUpcomingHolidays = (month, year, currentDate) => {
    upcomingHolidaysElem.innerHTML = '';
    const upcomingHolidays = Object.keys(holidays)
        .map(date => {
            const [month, day] = date.split('-').map(Number);
            return { month, day, name: holidays[date] };
        })
        .filter(holiday => (holiday.month === month + 1 && holiday.day > currentDate));

    if (upcomingHolidays.length) {
        upcomingHolidays.forEach(holiday => {
            const holidayElem = document.createElement('div');
            holidayElem.classList.add('holiday');
            holidayElem.innerHTML = `<span>${holiday.name}</span><span>${holiday.day}</span>`;
            upcomingHolidaysElem.appendChild(holidayElem);
        });
    } else {
        upcomingHolidaysElem.textContent = 'No upcoming holidays';
    }
};

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
