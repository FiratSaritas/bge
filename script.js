$(document).ready(function() {
    $(window).on('scroll', function() {
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        
        // Calculate the proportion of how far the user has scrolled
        var scrollProportion = scrollTop / (documentHeight - windowHeight);

        // Calculate the year based on the scroll proportion
        var minYear = 1875;
        var maxYear = 2024;
        var currentYear = Math.round(minYear + (maxYear - minYear) * scrollProportion);

        // Calculate the corresponding counter value
        var counterValue = 150 - (2024 - currentYear);
        
        // Update the year and counter displayed
        $('#year').text(currentYear);
        $('#counter').text(counterValue);
    });
});
