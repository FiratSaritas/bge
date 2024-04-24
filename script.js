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
            var maxFontSize = 100 * scalingFactor; // Maximum font size for the year
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

    // Function to handle search
    function handleSearch() {
        var searchTerm = $('#search-input').val().trim();
        
        // Check if the search term is not empty and contains only numbers
        if (searchTerm !== '' && /^\d+$/.test(searchTerm)) {
            var windowHeight = $(window).height();
            var middleViewport = windowHeight / 2;
            
            var found = false; // Flag to check if a match is found
            // Iterate through each year content and check if it matches the search term
            $('.year-content').each(function() {
                var yearText = $(this).find('.year').text().trim().toLowerCase();
                var counterText = $(this).find('.counter').text().trim().toLowerCase();
                if (yearText === searchTerm || counterText === searchTerm) {
                    // Scroll to the matched year content, positioning it in the middle of the viewport
                    var position = $(this).offset().top - middleViewport + ($(this).outerHeight() / 2);
                    $('html, body').animate({
                        scrollTop: position
                    }, 500);
                    found = true;
                    return false; // Exit the loop after finding the first match
                }
            });

            // If no match was found, display a message
            if (!found) {
                alert("No matching result found.");
            }
        } else {
            // If input is empty or contains non-numeric characters, display an error message
            alert("Please enter a valid number.");
        }
    }

    // Bind keydown event on the search input to allow only numeric input
    $('#search-input').on('keydown', function(event) {
        // Allow only numeric input (0-9), Backspace, and Enter
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode === 8 || event.keyCode === 13)) {
            event.preventDefault();
        }
        // Trigger search on Enter key
        if (event.keyCode === 13) {
            handleSearch();
        }
    });
});