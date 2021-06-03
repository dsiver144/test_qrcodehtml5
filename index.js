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
	const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = message => { /* handle success */ }
    const config = { fps: 10, qrbox: 250 };

    // If you want to prefer front camera
    html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccessCallback);

    // If you want to prefer back camera
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);

    // Select front camera or fail with `OverconstrainedError`.
    html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

    // Select back camera or fail with `OverconstrainedError`.
    html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
});
