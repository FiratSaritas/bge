// Dynamische Generierung der Jahre und Bände von 2025 (Band 151) bis 1875 (Band 1)\
function generateYearBandList(startYear = 2025, endYear = 1875, startBand = 151) {
    const container = document.getElementById('year-container');
    for (let year = startYear, band = startBand; year >= endYear; year--, band--) {
        const entry = document.createElement('div');
        entry.className = 'year-content';
        entry.innerHTML = `
            <p class="year">${year}</p>
            <div class="separator">|</div>
            <p class="counter">${band}</p>
        `;
        container.appendChild(entry);
    }
}

generateYearBandList();

$(document).ready(function() {
    // Removed all info panel toggle functionality
    // $('#info-btn').click(function() { ... });

    // Handle scroll animation
    function handleScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var maxScroll = $(document).height() - windowHeight;

        $('.year-content').each(function() {
            var position = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var centerPosition = position + (elementHeight / 2);

            // Calculate opacity based on distance from center of viewport
            var distanceFromCenter = Math.abs((scrollTop + windowHeight / 2) - centerPosition);
            var maxDistance = windowHeight / 2; // Max distance for full fade
            var opacity = 1 - (distanceFromCenter / maxDistance);
            opacity = Math.max(0.2, opacity); // Minimum opacity
            $(this).css('opacity', opacity);

            // Adjust size based on distance
            var scale = 1 - (distanceFromCenter / (windowHeight * 2)); // Slower scaling
            scale = Math.max(0.9, Math.min(1, scale)); // Ensure scale is between 0.9 and 1
            $(this).css('transform', `scale(${scale})`);
        });
    }

    // Handle search functionality
    function handleSearch() {
        const input = $('#search-input').val().trim();
        $('.year-content').removeClass('highlight').find('.year, .counter').css('color', ''); // Reset highlights

        if (input === '') {
            return; // Do nothing if input is empty
        }

        let found = false;
        const inputNum = parseInt(input, 10);

        if (!isNaN(inputNum)) {
            // Search by year or band
            $('.year-content').each(function() {
                const yearText = $(this).find('.year').text();
                const bandText = $(this).find('.counter').text();

                if (parseInt(yearText, 10) === inputNum || parseInt(bandText, 10) === inputNum) {
                    const position = $(this).offset().top - ($(window).height() / 2) + ($(this).outerHeight() / 2);
                    $('html, body').animate({ scrollTop: position }, 600, 'swing');
                    
                    // Highlight match
                    $(this).addClass('highlight');
                    $(this).find('.year, .counter').css('color', '#e74c3c');
                    
                    // Remove highlight after delay
                    setTimeout(() => {
                        $(this).removeClass('highlight');
                        $(this).find('.year, .counter').css('color', '');
                    }, 3000);
                    
                    found = true;
                    return false; // Break loop
                }
            });
            
            if (!found) {
                // Show error feedback
                $('#search-input').css('border', '2px solid #e74c3c');
                setTimeout(() => {
                    $('#search-input').css('border', 'none');
                }, 2000);
            }
        }
    }

    // Event handlers
    $(window).on('scroll', handleScroll);
    $('#search-input').on('input', handleSearch);
    $('#search-btn').click(handleSearch);
    $('#search-input').keypress(function(e) {
        if (e.which === 13) handleSearch();
    });

    // Initialize
    handleScroll();
    
    // Removed auto-open info panel on first visit
    // if (!localStorage.getItem('visited')) { ... }
});
