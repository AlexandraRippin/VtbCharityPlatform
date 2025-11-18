function heroClick(){
    const target = document.getElementById("projects-grid")
    const targetPosition = target.offsetTop-60
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
        if (startTime === null){
            startTime = currentTime
        }
        const timeElapsed = currentTime - startTime
        const t = timeElapsed / 1000
        const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t)*t
        const scroll = startPosition + distance*easing
        window.scrollTo(0,scroll)
        if (timeElapsed < 1000) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, targetPosition);
        }
    }

    requestAnimationFrame(animation);
}