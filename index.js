function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
docReady(function() {
    const result = document.getElementById("result");

    var savedCameraId = localStorage.getItem('cameraId');
    function startScan(cameraId) {
        const html5QrCode = new Html5Qrcode(/* element id */ "reader");
        html5QrCode.start(
        {deviceId: { exact: cameraId}}, // facingMode: "environment", 
        {
            fps: 10,    // Optional frame per seconds for qr code scanning
            qrbox: 250  // Optional if you want bounded box UI
        },
        qrCodeMessage => {
            // do something when code is read
            result.innerHTML = qrCodeMessage;
            //alert(qrCodeMessage);
        },
        errorMessage => {
            // parse error, ignore it.
            result.innerHTML = errorMessage;
            //alert(errorMessage);
            //result.innerHTML = errorMessage;
        })
        .catch(err => {
        // Start failed, handle it.
            result.innerHTML = err;
        });
    }
    if (savedCameraId) {
        startScan(savedCameraId);
    } else {
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                var cameraId = devices[1].id;
                localStorage.setItem('cameraId', cameraId);
                startScan(cameraId);
            }
        }).catch(err => {
            result.innerHTML = err;
        });
    }
    

});

