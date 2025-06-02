$(document).ready(function() {
    // Toggle info panel
    $('#info-btn').click(function() {
        $('.info-panel').slideToggle(300, function() {
            // Only scroll if we're opening the panel
            if ($(this).is(':visible')) {
                $('html, body').animate({
                    scrollTop: 0
                }, 300);
            }
        });
    });

    // Handle scroll animation
    function handleScroll() {
        var windowHeight = $(window).height();
        var scrollTop = $(window).scrollTop();
        var maxScroll = $(document).height() - windowHeight;

        $('.year-content').each(function() {
            var position = $(this).offset().top;
            var elementHeight = $(this).outerHeight();
            var centerPosition = position + (elementHeight / 2);
            var distanceFromCenter = Math.abs(windowHeight / 2 - centerPosition + scrollTop);
            
            // Adjust scaling based on viewport size
            var scalingFactor = windowHeight > 800 ? 1.5 : 1.2;
            
            // Calculate size multiplier (1 at center, 0.7 at edges)
            var sizeMultiplier = 1 - (distanceFromCenter / (windowHeight * 1.5));
            sizeMultiplier = Math.max(0.7, Math.min(1, sizeMultiplier));
            
            // Calculate opacity
            var opacity = 1 - (distanceFromCenter / (windowHeight));
            opacity = Math.max(0.4, Math.min(1, opacity));
            
            // Apply transformations
            $(this).css({
                'transform': `scale(${0.9 + (sizeMultiplier * 0.2)})`,
                'opacity': opacity
            });
            
            // Highlight current year in viewport center
            if (distanceFromCenter < 50) {
                $(this).addClass('highlight');
            } else {
                $(this).removeClass('highlight');
            }
        });
    }

    // Search function
    function handleSearch() {
        var searchTerm = $('#search-input').val().trim();
        
        if (searchTerm !== '' && /^\d+$/.test(searchTerm)) {
            var windowHeight = $(window).height();
            var middleViewport = windowHeight / 2;
            var found = false;
            
            $('.year-content').each(function() {
                var yearText = $(this).find('.year').text().trim();
                var counterText = $(this).find('.counter').text().trim();
                
                if (yearText === searchTerm || counterText === searchTerm) {
                    var position = $(this).offset().top - middleViewport + ($(this).outerHeight() / 2);
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
    
    // Auto-open info panel on first visit
    if (!localStorage.getItem('visited')) {
        $('.info-panel').slideDown(500);
        localStorage.setItem('visited', 'true');
    }
});