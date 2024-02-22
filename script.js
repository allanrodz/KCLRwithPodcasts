document.addEventListener('DOMContentLoaded', function() {
    const schedule = {
        // Your schedule object here
        "Monday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Full Time with Eddie Scally" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Late Night on KCLR" }
        ],
        "Tuesday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "01:00", show: "The Collection" },
            { start: "02:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "A Journey Through The Climate Crisis" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Late Night on KCLR" }
        ],
        "Wednesday": [
            { start: "00:00", show: "Ceol Anocht" },
            { start: "01:00", show: "The Jazz Show" },
            { start: "02:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Documentaries on KCLR: Full Circle" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Irish Music Show with Roddie Cleere" }
        ],
        "Thursday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "The Farm Show with Matt O’Keeffe" },
            { start: "20:00", show: "Fully Loaded with Eoin Carey" },
            { start: "22:00", show: "Ceol Anocht with Martin Bridgeman" }
        ],
        "Friday": [
            { start: "00:00", show: "Ceol Anocht with Martin Bridgeman" },
            { start: "01:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "KCLR Breakfast with John Walsh" },
            { start: "10:00", show: "The KCLR Daily with Brian Redmond" },
            { start: "13:00", show: "The John Keane Show" },
            { start: "16:00", show: "The Home Run with Shannon Redmond" },
            { start: "19:00", show: "Friday Scoreline with Robbie Dowling" },
            { start: "20:00", show: "Friday Night Live with Eddie Hughes" },
            { start: "22:00", show: "Late Night with Brendan Hennessy" }
        ],
        "Saturday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "The Breakfast Buffet with Natesshalie Lennon" },
            { start: "10:00", show: "The Saturday Show with Edward Hayden" },
            { start: "12:00", show: "Saturday Brunch with Eddie Hughes" },
            { start: "14:00", show: "Saturday Scorelines" },
            { start: "18:00", show: "Saturday Night Party" },
            { start: "20:00", show: "Transmission with Eleanor Malone" },
            { start: "22:00", show: "Late Night with Brendan Hennessy" }
        ],
        "Sunday": [
            { start: "00:00", show: "KCLR Through The Night" },
            { start: "07:00", show: "The Farm Show" },
            { start: "08:00", show: "The Lake Country" },
            { start: "11:00", show: "KCLR Classics with Carol Dooley" },
            { start: "14:00", show: "Sunday Scoreline" },
            { start: "18:00", show: "Nathalie Lennon on KCLR" },
            { start: "20:00", show: "Sunday Evenings with Tara Byrne" },
            { start: "22:00", show: "Late Night with Eoin Carey" }
        ]
    };

    // Slideshow Functionality
    let slideIndex = 0;
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }
    showSlides();

    // Now Playing Banner
    function getCurrentShow() {
        const now = new Date();
        const dayOfWeek = now.toLocaleString('en-us', {weekday: 'long'});
        const currentTime = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
        const todaysSchedule = schedule[dayOfWeek];
        let currentShow = "Show information not available";

        for (let i = 0; i < todaysSchedule.length; i++) {
            const show = todaysSchedule[i];
            if (currentTime >= show.start && (i === todaysSchedule.length - 1 || currentTime < todaysSchedule[i + 1].start)) {
                currentShow = show.show;
                break;
            }
        }
        return currentShow;
    }

    function updateBanner() {
        const textSpan = document.getElementById('now-playing-text');
        textSpan.textContent = "Now Playing: " + getCurrentShow();
    }
    updateBanner();
    setInterval(updateBanner, 60000);

    // Schedule Carousel Functionality
    const carouselContainer = document.querySelector('.carousel-items');
    Object.keys(schedule).forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'carousel-item';
        dayDiv.innerHTML = `<h3>${day}</h3>` + schedule[day].map(show => `<p>${show.start}: ${show.show}</p>`).join('');
        carouselContainer.appendChild(dayDiv);
    });

    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    items[currentIndex].style.display = 'block';

    document.querySelector('.prev').addEventListener('click', function() {
        changeSlide(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        changeSlide(1);
    });

    function changeSlide(move) {
        items[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + move + items.length) % items.length;
        items[currentIndex].style.display = 'block';
    }

    // Radio Player Toggle
    const toggleButton = document.getElementById('togglePlayer');
    const icon = toggleButton.querySelector('i'); // Select the icon within the button
    const playerContainer = document.getElementById('playerContainer');
    let playerActive = true;

    toggleButton.addEventListener('click', function() {
        if (playerActive) {
            // Stop and remove the iframe
            playerContainer.innerHTML = '';
            toggleButton.innerHTML = '<i class="fas fa-power-off" style="color: green;"></i> Turn ON Radio'; // Update button text and icon color to green
            playerActive = false;
        } else {
            // Re-create and append the iframe
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'https://tunein.com/embed/player/s80564/');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.frameBorder = 'no';
            iframe.scrolling = 'no';
            iframe.allowFullscreen = true;
            playerContainer.appendChild(iframe);
            toggleButton.innerHTML = '<i class="fas fa-power-off" style="color: red;"></i> Turn OFF Radio'; // Update button text back and icon color to red
            playerActive = true;
        }
    });


    // Schedule and Podcasts Overlay Functionality
    const openScheduleButton = document.getElementById('openSchedule');
    const scheduleOverlay = document.getElementById('scheduleOverlay');
    openScheduleButton.onclick = function() {
        scheduleOverlay.style.display = 'block';
    };
    scheduleOverlay.onclick = function(event) {
        if (event.target == scheduleOverlay) {
            scheduleOverlay.style.display = "none";
        }
    };

    function showPodcastsOverlay() {
        const podcastsOverlay = document.getElementById('podcastsOverlay');
        podcastsOverlay.style.display = 'flex';
    }
    const podcastBanner = document.querySelector('.podcast-banner-slide');
    podcastBanner.addEventListener('click', showPodcastsOverlay);

    podcastsOverlay.addEventListener('click', function(event) {
        if (event.target == podcastsOverlay) {
            podcastsOverlay.style.display = 'none';
        }
    });
});
