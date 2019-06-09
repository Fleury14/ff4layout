class GameTimer {
    constructor() {
        console.log('constructing...');
        this.frac = 0;
        this.secs = 0;
        this.mins = 0
        this.hrs = 0;
        this.timer = null;
        this.name = 'hello';
    }

    returnTime() {
        let minDisplay = "";
        let secDisplay = "";
        if (this.mins < 10) {
            minDisplay = "0" + this.mins.toString();
        } else minDisplay = this.mins.toString();
        if (this.secs < 10) {
            secDisplay = "0" + this.secs.toString();
        } else secDisplay = this.secs.toString();
        return `${minDisplay}:${secDisplay}.${Math.floor(this.frac/10)}`;
    }

    startTimer() {
        this.timer = setInterval(this.incrementTimer.bind(this), 10);
        console.log('timer started');
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    resetTimer() {
        console.log('resetting...');
        this.frac = 0;
        this.secs = 0;
        this.mins = 0
        this.hrs = 0;
        this.timer = null;
    }

    incrementTimer() {
        this.frac++;
        if (this.frac >= 100) {
            this.secs++;
            this.frac = 0;
        }
        if (this.secs === 60) {
            this.mins++;
            this.secs = 0;
        }
        if (this.mins === 60) {
            this.hrs++;
            this.mins = 0;
        }
    }
}
