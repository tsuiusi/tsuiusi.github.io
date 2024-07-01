document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.dvd-link');
    const content = document.querySelector('.content-layer');
    const mainTitle = document.getElementById('title');
    
    let animationFrames = [];
    let isAnimating = true;

    function setupLink(link) {
        const minX = 100;
        const minY = 50;
        
        if (!link.dataset.speedX) {
            link.style.left = `${Math.random() * (window.innerWidth - minX) + minX}px`;
            link.style.top = `${Math.random() * (window.innerHeight - minY) + minY}px`;
            
            const minSpeed = 5;
            link.dataset.speedX = (Math.random() - 0.5) * 4 + (Math.random() < 0.5 ? minSpeed : -minSpeed);
            link.dataset.speedY = (Math.random() - 0.5) * 4 + (Math.random() < 0.5 ? minSpeed : -minSpeed);
        }

        let speedX = parseFloat(link.dataset.speedX);
        let speedY = parseFloat(link.dataset.speedY);
        
        function animate() {
            if (!isAnimating) return;

            let linkRect = link.getBoundingClientRect();
            let contentRect = content.getBoundingClientRect();
            
            if (linkRect.left <= 0 || linkRect.right >= window.innerWidth) {
                speedX = -speedX;
            }
            if (linkRect.top <= 0 || linkRect.bottom >= window.innerHeight) {
                speedY = -speedY;
            }
            
            if (linkRect.left < contentRect.right && linkRect.right > contentRect.left &&
                linkRect.top < contentRect.bottom && linkRect.bottom > contentRect.top) {
                if (Math.abs(linkRect.left - contentRect.right) < 10 || Math.abs(linkRect.right - contentRect.left) < 10) {
                    speedX = -speedX;
                }
                if (Math.abs(linkRect.top - contentRect.bottom) < 10 || Math.abs(linkRect.bottom - contentRect.top) < 10) {
                    speedY = -speedY;
                }
            }
            
            link.style.left = `${linkRect.left + speedX}px`;
            link.style.top = `${linkRect.top + speedY}px`;
            
            link.dataset.speedX = speedX;
            link.dataset.speedY = speedY;
            
            animationFrames[link.dataset.animationIndex] = requestAnimationFrame(animate);
        }
        
        return animate;
    }

    function startAnimations() {
        isAnimating = true;
        links.forEach((link, index) => {
            if (!link.dataset.animationIndex) {
                link.dataset.animationIndex = index;
            }
            const animateFunction = setupLink(link);
            animationFrames[index] = requestAnimationFrame(animateFunction);
        });
    }

    function stopAnimations() {
        isAnimating = false;
        animationFrames.forEach(frame => cancelAnimationFrame(frame));
    }

    startAnimations(); // Start animations initially

    mainTitle.addEventListener('click', () => {
        if (isAnimating) {
            stopAnimations();
            mainTitle.classList.add('paused');
        } else {
            startAnimations();
            mainTitle.classList.remove('paused');
        }
    });
});
