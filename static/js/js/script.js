
document.addEventListener('DOMContentLoaded', function() {
    var menu = document.getElementById('menu');
    menu.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'A') {
            var next = e.target.nextElementSibling;
            if (next && next.classList.contains('dropdown')) {
                next.style.display = 'block';
            }
        }
    });

    menu.addEventListener('mouseout', function(e) {
        if (e.target.tagName === 'A') {
            var next = e.target.nextElementSibling;
            if (next && next.classList.contains('dropdown')) {
                next.style.display = 'none';
            }
        }
    });
});
