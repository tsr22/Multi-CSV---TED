var dateOfOpen = '12/3/22'


const getTime = () => {
    const currentYear = new Date().getFullYear();
    return new Date(dateOfOpen);
};


// updatebottom txt water mark
const bottomInfo = document.querySelector('.bottomText');
bottomInfo.innerHTML = "Horseshoe Lake Charles"; 

const dateOfOpenText = document.querySelector('.dateToOpen')
dateOfOpenText.innerHTML = dateOfOpen;


// select elements
const app = document.querySelector('.countdown-timer');
const message = document.querySelector('.message');
const heading = document.querySelector('h1');



const render = (time) => {
    app.innerHTML = `
        <div class="count-down">
            <div class="timer">
                <h2 class="days">${time.days}</h2>
                <small>Days</small>
            </div>
            <div class="timer">
                <h2 class="hours">${time.hours}</h2>
                <small>Hours</small>
            </div>
            <div class="timer">
                <h2 class="minutes">${time.minutes}</h2>
                <small>Minutes</small>
            </div>
            <div class="timer">
                <h2 class="seconds">${time.seconds}</h2>
                <small>Seconds</small>
            </div>
        </div>
        `;
   
};


const showMessage = () => {
    message.innerHTML = `Open?`;
    app.innerHTML = '';
    heading.style.display = 'none';
};

const hideMessage = () => {
    message.innerHTML = '';
    heading.style.display = 'block';
};

const complete = () => {
    showMessage();

};

const countdownTimer1 = new CountDown(
    getTime(),
    render,
    complete
);
