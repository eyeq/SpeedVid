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

    function onPlus(video) {
        video.playbackRate += 0.25;
        log(video.playbackRate, "speed");
    }

    function onMinus(video) {
        if(video.playbackRate > 0.25) {
            video.playbackRate -= 0.25;
        }
        log(video.playbackRate, "speed");
    }

    function onZero(video) {
        video.playbackRate = 1;
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
                    onPlus(vid());
                    break;
                case "-":
                case "_":
                    onMinus(vid());
                    break;
                case ")":
                case "0":
                    onZero(vid());
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