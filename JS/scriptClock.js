
function Clock(timezone, elementId) {
    this.clockModeShort = false;
    this.timezone = timezone;
    this.elementId = elementId;
    
    this.formatTime = function(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };

    var that = this;
    document.getElementById(this.elementId).addEventListener('click', function(){ that.toggleClockPicker() } , false);
};

Clock.prototype.renderClock = function() {
        var timezoneDateString = new Date().toLocaleString("en-US", {timeZone: this.timezone});
        var timezoneDate = new Date(timezoneDateString);
        var h = timezoneDate.getHours();
        var m = timezoneDate.getMinutes();
        var s = timezoneDate.getSeconds();
        m = this.formatTime(m);
        s = this.formatTime(s);

        var timeHtml;

        if(this.clockModeShort){
            timeHtml = h + ":" + m;
        }
        else {
            timeHtml = h + ":" + m + ":" + s;
        }

        document.getElementById(this.elementId).innerHTML = timeHtml;

        var that = this;
        var t = setInterval(function(){ that.renderClock() }, 500); 
    };

    Clock.prototype.toggleClockPicker = function(){
    var x = document.getElementById(this.elementId);
    x.classList.toggle("shortTime");
    x.classList.toggle("longTime");
    this.clockModeShort = !this.clockModeShort;
    this.renderClock();
};



function NewDate(timezone, elementId) {
Clock.call(this, timezone, elementId);
var d = new Date();
var dataYear = d.toUTCString();
var k = new Date();
var fullYear = k.getFullYear();

NewDate.prototype.renderClock = function() {
            if(this.clockModeShort){
                timeHtml =  dataYear;
            }
            else {
                timeHtml =  fullYear;
            }

            document.getElementById(this.elementId).innerHTML = timeHtml;

            var that = this;
            var t = setInterval(function(){ that.renderClock() }, 500);
        };
}


NewDate.prototype = Object.create(Clock.prototype);
NewDate.prototype.constructor = NewDate;

function NewClock(timezone, elementId) {
Clock.call(this, timezone, elementId);
var d = new Date();
var dataPlus = d.toUTCString(d.setDate(d.getDate() + 30));

NewClock.prototype.renderClock = function() {
        var timezoneDateString = new Date().toLocaleString("en-US", {timeZone: this.timezone});
        var timezoneDate = new Date(timezoneDateString);
        var h = timezoneDate.getHours();
        var m = timezoneDate.getMinutes();
        var s = timezoneDate.getSeconds();
        m = this.formatTime(m);
        s = this.formatTime(s);

            if(this.clockModeShort){
                timeHtml = 'Data, plus 30 day: ' + dataPlus;; 
            }
            else {
            timeHtml = h + ":" + m + ":" + s;
        }
            document.getElementById(this.elementId).innerHTML = timeHtml;
            var that = this;
            var t = setInterval(function(){ that.renderClock() }, 500);
        };
}

NewClock.prototype = Object.create(Clock.prototype);
NewClock.prototype.constructor = NewClock;


function createClock() {
    var clock1 = new Clock("America/New_York", "clock1Id");
    clock1.renderClock();
    var clock2 = new Clock("Europe/London", "clock2Id");
    clock2.renderClock();
    var clock3 = new Clock("UTC", "clock3Id");
    clock3.renderClock();
    var clock4 = new NewDate("America/New_York", "clock4Id");
    clock4.renderClock();
    var clock5 = new NewClock("UTC", "clock5Id");
    clock5.renderClock();
};

window.addEventListener('load', createClock, false);
