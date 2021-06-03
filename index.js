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
	function onScanSuccess(qrCodeMessage) {
		console.log(qrCodeMessage);
	}
	let html5QrcodeScanner = new Html5QrcodeScanner(
		"scanner", { fps: 10, qrbox: 250 });
	html5QrcodeScanner.render(onScanSuccess, _ => { /** ignore error */ });
});
