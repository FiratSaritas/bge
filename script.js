$(document).ready(function() {
    // Function to handle scroll event
    function handleScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var maxScroll = $(document).height() - windowHeight;

        $('.year').each(function() {
            var position = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var centerPosition = position + (elementHeight / 2); // Center position of the year

            // Calculate the distance of the year from the center of the viewport
            var distanceFromCenter = Math.abs(windowHeight / 2 - centerPosition + scrollTop);
            
            // Adjust scaling factor based on viewport height
            var scalingFactor = windowHeight > 800 ? 1.5 : 1; // Adjust as needed

            // Calculate the font size based on the distance from the center
            var maxDistance = windowHeight / 2;
            var maxFontSize = 80 * scalingFactor; // Maximum font size for the year
            var minFontSize = 2 * scalingFactor;  // Minimum font size for the year
            var fontSize = minFontSize + (1 - (distanceFromCenter / maxDistance)) * (maxFontSize - minFontSize); // Adjust the scale factor as needed

            // Update the font size of the year
            $(this).css('font-size', fontSize + 'px');
            
            // Update the font size of the counter (same as the year)
            $(this).siblings('.counter').css('font-size', fontSize + 'px');
        });
    }

    // Trigger scroll event handler after page load
    handleScroll();

    // Bind scroll event handler
    $(window).on('scroll', handleScroll);
});
