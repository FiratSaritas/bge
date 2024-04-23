$(document).ready(function() {
    $(window).on('scroll', function() {
        var scrollPosition = $(this).scrollTop();
        var maxScroll = $(document).height() - $(window).height();
        var minYear = 1875;
        var maxYear = 2024;

        // Ensure scrollPosition doesn't exceed maxScroll
        scrollPosition = Math.min(scrollPosition, maxScroll);

        // Calculate the year based on the scroll position
        var currentYear = Math.round((maxYear - minYear) * (scrollPosition / maxScroll)) + minYear;

        // Calculate the corresponding counter value
        var counterValue = 150 - (2024 - currentYear);

        // Update the year and counter displayed
        $('#year').text(currentYear);
        $('#counter').text(counterValue);
    });
});
