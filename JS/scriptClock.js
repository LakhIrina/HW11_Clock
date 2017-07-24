function Clock(timezone, elementId) {
    this.clockModeShort = false;
    this.timezone = timezone;
    this.elementId = elementId;

    this.formatTime = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    var that = this;
    document.getElementById(this.elementId).addEventListener('click', function () {
        that.toggleClockPicker()
    }, false);
};

Clock.prototype.renderClock = function () {
    var timezoneDateString;
    var timezoneDate;
    var h;
    var m;
    var s;
    var timeHtml;
    timezoneDateString = new Date().toLocaleString("en-US", {timeZone: this.timezone});
    timezoneDate = new Date(timezoneDateString);
    h = timezoneDate.getHours();
    m = timezoneDate.getMinutes();
    s = timezoneDate.getSeconds();
    m = this.formatTime(m);
    s = this.formatTime(s);

        if (this.clockModeShort) {
            timeHtml = h + ":" + m;
        } else {
            timeHtml = h + ":" + m + ":" + s;
        }

    document.getElementById(this.elementId).innerHTML = timeHtml;

    var that = this;
    setInterval(function () {
        that.renderClock()
    }, 500);
};

Clock.prototype.toggleClockPicker = function () {
    var x = document.getElementById(this.elementId);
    x.classList.toggle("shortTime");
    x.classList.toggle("longTime");
    this.clockModeShort = !this.clockModeShort;
    this.renderClock();
};

function Clock3(timezone, elementId) {
    Clock.call(this, timezone, elementId);
};

Clock3.prototype = Object.create(Clock.prototype);
Clock3.prototype.constructor = Clock3;

function NewDate(timezone, elementId) {
    Clock.call(this, timezone, elementId);
    var d;
    var k;
    d = new Date();
    this.dataToday = d.toUTCString();
    k = new Date();
    this.fullYear = k.getFullYear();
}

NewDate.prototype = Object.create(Clock.prototype);
NewDate.prototype.constructor = NewDate;

NewDate.prototype.renderClock = function () {
    if (this.clockModeShort) {
        timeHtml = this.dataToday;
    } else {
        timeHtml = this.fullYear;
    }

    document.getElementById(this.elementId).innerHTML = timeHtml;

    var that = this;
    setInterval(function () {
        that.renderClock()
    }, 500);
};


function NewClock(timezone, elementId) {
    Clock.call(this, timezone, elementId);
    var d;
    var k;
    d = new Date();
    this.dataPlus = d.toUTCString(d.setDate(d.getDate() + 30));
    k = new Date();
    this.fullYear = k.getFullYear();
}

NewClock.prototype = Object.create(Clock.prototype);
NewClock.prototype.constructor = NewClock;

NewClock.prototype.renderClock = function () {
    if (this.clockModeShort) {
        timeHtml = 'Data, plus 30 day: ' + this.dataPlus;
    } else {
        timeHtml = "Year: " + this.fullYear;
    }

    document.getElementById(this.elementId).innerHTML = timeHtml;

    var that = this;
    setInterval(function () {
        that.renderClock()
    }, 500);
};

function createClock() {
    var clock1;
    var clock2;
    var clock3;
    var clock4;
    var clock5;
    clock1 = new Clock("America/New_York", "clock1Id");
    clock1.renderClock();
    clock2 = new Clock("Europe/London", "clock2Id");
    clock2.renderClock();
    clock3 = new Clock3("UTC", "clock3Id");
    clock3.renderClock();
    clock4 = new NewDate("America/New_York", "clock4Id");
    clock4.renderClock();
    clock5 = new NewClock("UTC", "clock5Id");
    clock5.renderClock();
};

window.addEventListener('load', createClock, false);
