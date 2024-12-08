const currentTimeEl = document.getElementById('current-time');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const amPmSelect = document.getElementById('am-pm');
const setAlarmButton = document.getElementById('set-alarm');
const alarmsList = document.getElementById('alarms-list');

let alarms = [];

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');
    currentTimeEl.textContent =`${hours}:${minutes}:${seconds}`;

    checkAlarms(hours,minutes,seconds);
}

function checkAlarms(hours, minutes, seconds) {
    alarms.forEach((alarm, index) => {
        if (alarm.time ===`${hours}:${minutes}:${seconds}`){
            alert(`Alarm ${alarm.label} is ringing!`);
            alarms.splice(index,1);
        }
    });
}

function setAlarm() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    const amPm = amPmSelect.value;

    const adjustedHours = amPm === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && amPm === 'AM' ? 0 : hours;
    const alarmTime = `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    alarms.push({ time: alarmTime, label: `${hours}:${minutes}:${seconds} ${amPm}`});
    updateAlarmsList();
}

function updateAlarmsList(){
    alarmsList.innerHTML = '';
    alarms.forEach((alarm,index) => {
        const alarmItem = document.createElement('div');
        alarmItem.className = 'alarm-item';
        alarmItem.innerHTML = `
        <span>${alarm.label}</span>
        <button class="btn btn-danger btn-sm" onclick="deleteAlarm(${index})">Delete</button>
        `;
        alarmsList.appendChild(alarmItem);
    });
}

function deleteAlarm(index) {
    alarms.splice(index,1);
    updateAlarmsList();
}

setAlarmButton.addEventListener('click', setAlarm);
setInterval(updateClock,1000);

updateClock();