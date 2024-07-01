document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.dvd-link');
    
    links.forEach(link => {
        // Set initial random position
        link.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        link.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        
        // Set random speed and direction
        let speedX = (Math.random() - 0.5) * 4;
        let speedY = (Math.random() - 0.5) * 4;
        
        function animate() {
            let rect = link.getBoundingClientRect();
            
            // Bounce off edges
            if (rect.left <= 0 || rect.right >= window.innerWidth) {
                speedX = -speedX;
            }
            if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
                speedY = -speedY;
            }
            
            // Move the link
            link.style.left = `${rect.left + speedX}px`;
            link.style.top = `${rect.top + speedY}px`;
            
            requestAnimationFrame(animate);
        }
        
        animate();
	});
});
