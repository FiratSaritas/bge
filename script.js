$(document).ready(function() {
    $(window).on('scroll', function() {
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        
        // Calculate the percentage scrolled
        var scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Calculate the year based on the scroll percentage
        var minYear = 1875;
        var maxYear = 2024;
        var currentYear = Math.round(((maxYear - minYear) * scrollPercentage) / 100) + minYear;

        // Calculate the corresponding counter value
        var counterValue = 150 - (2024 - currentYear);
        
        // Update the year and counter displayed
        $('#year').text(currentYear);
        $('#counter').text(counterValue);
    });
});
