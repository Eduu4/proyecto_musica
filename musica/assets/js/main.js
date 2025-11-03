// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Nueva Canción Form Handler
    const newSongForm = document.getElementById('newSongForm');
    if (newSongForm) {
        newSongForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para guardar la canción
            Swal.fire({
                title: '¡Guardado!',
                text: 'Tu canción ha sido guardada exitosamente',
                icon: 'success',
                confirmButtonColor: '#198754'
            }).then(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('newSongModal'));
                modal.hide();
                newSongForm.reset();
            });
        });
    }

    // Search Handler
    const searchBox = document.querySelector('.search-box input');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            // Aquí iría la lógica de búsqueda en tiempo real
            console.log('Searching for:', e.target.value);
        });
    }

    // Tempo Control
    const tempoValue = document.querySelector('input[readonly]');
    const decreaseBtn = tempoValue?.previousElementSibling;
    const increaseBtn = tempoValue?.nextElementSibling;
    
    decreaseBtn.addEventListener('click', () => {
        let currentTempo = parseInt(tempoValue.value);
        if (currentTempo > 40) {
            tempoValue.value = currentTempo - 5;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let currentTempo = parseInt(tempoValue.value);
        if (currentTempo < 220) {
            tempoValue.value = currentTempo + 5;
        }
    });



    // Tooltip initialization for all buttons
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Search functionality
    const searchForm = document.querySelector('form.d-flex');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchQuery = this.querySelector('input').value;
        // Add your search logic here
        console.log('Searching for:', searchQuery);
    });

    // Responsive handling for tab notation
    const tabNotation = document.querySelector('.tab-notation');
    function adjustTabNotationSize() {
        if (window.innerWidth < 768) {
            tabNotation.style.fontSize = '0.8rem';
        } else {
            tabNotation.style.fontSize = '0.9rem';
        }
    }

    window.addEventListener('resize', adjustTabNotationSize);
    adjustTabNotationSize();

    // Add animation class to buttons on hover
    const buttons = document.querySelectorAll('.btn-outline-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
});