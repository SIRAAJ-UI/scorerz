$(document).ready(function () {
    $("#blockd").click(function () {
        // Default blockUI code
        $.blockUI({
            message: "<h3>loading...<h3>",
            css: { color: '#007cc4', borderColor: '#007cc4' }
        });
        setTimeout(function () {
            // Timer to unblock    
            $.unblockUI();
        }, 3000);
    });
})