javascript:(function () {
    if (window.speedVidHighlander) {
        log("SpeedVid already loaded.");
        return;
    }

    function appendCss(url) {
        return new Promise(resolve => {
            let el = document.createElement("link");
            el.addEventListener("load", resolve, false);
            el.setAttribute("rel", "stylesheet");
            el.setAttribute("type", "text/css");
            el.setAttribute("href", url);

            document.body.appendChild(el);
        });
    }

    function appendScript(url) {
        return new Promise(resolve => {
            let el = document.createElement('script');
            el.addEventListener("load", resolve, false);
            el.setAttribute("type", "text/javascript");
            el.setAttribute("src", url);

            document.body.appendChild(el);
        });
    }

    function log(msg, subTitle) {
        console.log(msg);

        toastr.remove();
        toastr.options.closeDuration = 100;
        toastr.options.timeOut = 300;
        toastr.options.extendedTimeOut = 1000;
        toastr.info(msg, "Speed Vid" + (subTitle ? " - " + subTitle : ""));
    }

    function timeStr(seconds) {
        var d = moment.duration(seconds, "seconds");
        return moment.utc(d.asMilliseconds()).format("H:mm:ss.SS");
    }

    function appendSpeed(video, accel) {
        video.playbackRate = Math.max(0.25, video.playbackRate + accel);
        log(video.playbackRate, "speed");
    }

    function setSpeed(video, speed) {
        video.playbackRate = Math.max(0.25, speed);
        log(video.playbackRate, "speed");
    }

    function onLeftBracket(video) {
        video.currentTime -= 5;
        log(timeStr(video.currentTime), "time");
    }

    function onRightBracket(video) {
        video.currentTime += 5;
        log(timeStr(video.currentTime), "time");
    }

    function onPause(video) {
        video.pause();
        log(timeStr(video.currentTime), "paused at");
    }

    function onPlay(video) {
        video.play();
        log(timeStr(video.currentTime), "resumed at");
    }

    function vid() {
        return document.getElementsByTagName("video")[0] || {};
    }

    function loadSpeedVid() {
        window.speedVidHighlander = true;

        appendScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js")
            .then(() => Promise.all([
                    appendCss("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"),
                    appendScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"),
                    appendScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"),
                ])
            ).then(loadMain);
    }

    function loadMain() {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "+":
                case "=":
                    appendSpeed(vid(), 0.25);
                    break;
                case "-":
                case "_":
                    appendSpeed(vid(), -0.25);
                    break;
                case "0":
                case "1":
                    setSpeed(vid(), 1);
                    break;
                case "2":
                    setSpeed(vid(), 2);
                    break;
                case "3":
                    setSpeed(vid(), 3);
                    break;
                case "4":
                    setSpeed(vid(), 4);
                    break;
                case "5":
                    setSpeed(vid(), 5);
                    break;
                case "6":
                    setSpeed(vid(), 6);
                    break;
                case "7":
                    setSpeed(vid(), 7);
                    break;
                case "8":
                    setSpeed(vid(), 8);
                    break;
                case "9":
                    setSpeed(vid(), 9);
                    break;
                case "}":
                case "]":
                    onRightBracket(vid());
                    break;
                case "{":
                case "[":
                    onLeftBracket(vid());
                    break;
                case "p":
                case "P":
                    onPause(vid());
                    break;
                case "o":
                case "O":
                    onPlay(vid());
                    break;
                default:
                    return;
            }
            e.stopPropagation();
        }, true);

        log("Speed Vid - loaded");
    }

    loadSpeedVid();
})();