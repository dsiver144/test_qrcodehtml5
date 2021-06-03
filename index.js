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
    const cameraIdNode = document.getElementById("camera");
    const qrCodeSuccessCallback = message => { /* handle success */ }
    const config = { fps: 10, qrbox: 250 };

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            cameraIdNode.innerHTML = cameraId;
            // .. use this to start scanning.
            const html5QrCode = new Html5Qrcode(/* element id */ "reader");
            html5QrCode.start(
            { facingMode: { exact: "environment"}, deviceId: {exact: cameraId}}, 
            {
                fps: 15,    // Optional frame per seconds for qr code scanning
                qrbox: 250  // Optional if you want bounded box UI
            },
            qrCodeMessage => {
                // do something when code is read
                result.innerHTML = qrCodeMessage;
            },
            errorMessage => {
                // parse error, ignore it.
                result.innerHTML = errorMessage;
            })
            .catch(err => {
            // Start failed, handle it.
            result.innerHTML = err;
            });

        }
    }).catch(err => {
        // handle err
    });

});

