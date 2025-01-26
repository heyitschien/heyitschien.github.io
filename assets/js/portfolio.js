document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projects = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentlyShown = 6;
    
    function loadMore() {
        const hiddenProjects = document.querySelectorAll('[data-category].d-none');
        const toShow = hiddenProjects.length > 3 ? 3 : hiddenProjects.length;
        
        for(let i = 0; i < toShow; i++) {
            hiddenProjects[i].classList.remove('d-none');
        }
        ``
        if (hiddenProjects.length <= 3) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMore);
    }
}); 