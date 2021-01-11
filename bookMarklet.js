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

    function keyDownForVideo(e) {
        if (!(e.shiftKey && e.ctrlKey)) {
            return;
        }

        switch (e.key) {
            case "+":
            case "=":
                onPlus();
                break;
            case "-":
            case "_":
                onMinus();
                break;
            case ")":
            case "0":
                onZero();
                break;
            case "}":
            case "]":
                onRightBracket();
                break;
            case "{":
            case "[":
                onLeftBracket();
                break;
            case "p":
            case "P":
                onPause();
                break;
            case "o":
            case "O":
                onPlay();
                break;
        }
    }

    function vid() {
        return document.getElementsByTagName("video")[0] || {};
    }

    function precision(n, p) {
        p = p || 0;
        return Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
    }

    function timeStr(seconds) {
        var d = moment.duration(seconds, "seconds");
        return moment.utc(d.asMilliseconds()).format("H:mm:ss.SS");
    }

    function log(msg, subTitle) {
        /*var out = document.getElementById("out");
        out.innerText = msg;*/
        console.log(msg);
        toastr.remove();
        toastr.options.closeDuration = 100;
        toastr.options.timeOut = 300;
        toastr.options.extendedTimeOut = 1000;
        toastr.info(msg, "Speed Vid" + (subTitle ? " - " + subTitle : ""));
    }

    const speedStep = 1.1;
    const valuePrecision = 2;

    function onPlus() {
        vid().playbackRate *= speedStep;
        vid().playbackRate = precision(vid().playbackRate, valuePrecision);
        log(vid().playbackRate, "speed");
    }

    function onMinus() {
        vid().playbackRate /= speedStep;
        vid().playbackRate = precision(vid().playbackRate, valuePrecision);
        log(vid().playbackRate, "speed");
    }

    function onZero() {
        vid().playbackRate = 1;
        log(vid().playbackRate, "speed");
    }

    function onLeftBracket() {
        vid().currentTime -= 5;
        log(timeStr(vid().currentTime), "time");
    }

    function onRightBracket() {
        vid().currentTime += 5;
        log(timeStr(vid().currentTime), "time");
    }

    function onPause() {
        vid().pause();
        log(timeStr(vid().currentTime), "paused at");
    }

    function onPlay() {
        vid().play();
        log(timeStr(vid().currentTime), "resumed at");
    }

    function loadSpeedVid() {
        appendScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js")
            .then(() => Promise.all([
                    appendCss("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"),
                    appendScript("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"),
                    appendScript("https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"),
                ])
            ).then(loadMain);
    }

    function loadMain() {
        document.addEventListener("keydown", keyDownForVideo, false);
        log("Speed Vid - loaded");
        window.speedVidHighlander = true;
    }

    loadSpeedVid();
})();