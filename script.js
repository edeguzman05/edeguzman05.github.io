const cards = document.querySelectorAll('.card');
const targetZone = document.getElementById('monster-zone-3');
const hologram = document.getElementById('hologram-display');
const hologramContent = document.querySelector('.hologram-content');
const returnBtn = document.getElementById('return-button'); 
const handContainer = document.querySelector('.hand');

let activeCard = null; 

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Adds the class you already made in your CSS!
        card.classList.add('flipped'); 
    });
});

// 1. Hologram text data states (Pre-loaded with your About & Socials structure)
const pageData = {
    'about-card': {
        loading: '<h2>System</h2><br><p>Loading Cyberse Developer parameters...</p>',
        actual: `
            <div class="hologram-scroll-area">
                <div class="scroll-card">
                    <h3> Duelist: Gara </h3>
                    <p> Otherwise known as Emmanuel De Guzman, I've been in computer science since high school starting within my tech class with HTML/CSS and JS being my first language </p>
                    <p> I am currently pursuing a degree in Computer Science at California State University, Fullerton, and have plan on getting a master's degree in the future. Though I plan to work in the field as well, possibly pursuing a career in software development </p>
                    <p> A lot of my ideas stem from my experiences and the problems I encounter in my daily life. I also really want to change the world and have a much more profound and positive impact using the technology that I have been graced with. This also means helping those with special needs and developing new and innovative tools to help them feel included. </p>
                    <img class="hologram-image" src="personalSRC/selfie.jpg">
                    <p> I enjoy problem solving and logical thinking, with a passion for creating an elegant yet effective solution to problems in today's world. </p>
                    <p> I have interest in machine learning, databases management, algorithms, data structure implementation, and software development.</p>

                </div>
                <div class="scroll-card">
                    <h3> Skills and Experience </h3>
                        <p> Languages Known: JavaScript, Python, Java, C++, HTML, CSS, SQL </p>
                        <p> Tools: Git, Visual Studio Code </p>
                        <p> Skills: Problem Solving, Logical Thinking, Teamwork, Communication, Patience, Adaptability </p>

                        <p> I have experience using various tools not related to programming, such as Adobe Photoshop, Illustrator, Premiere Pro and some minimal experience with After Effects.</p>
                        <p> Outside of CS, I work as a Special Education Instructional Aide at Arcadia Unified School District, where I assist students with special needs in their academic and social development. This role has enhanced my communication skills, patience, and ability to adapt to different learning styles. This includes students with autism, ADHD, and other developmental disabilities. </p>

                        <p> I have also worked as a tutor at my high school as well, where I provided academic support to students in various subjects, including math for summer school. </p>
                        <p> I have also worked on different projects, often trying to do solo projects, such as  discord bot, building a personal website, and creating simple games.</p>
                        <img class="hologram-image" src="src/cpp.png">
                        <img class="hologram-image" src="src/python.png">
                        <p> I plan on working more on these projects and building more in the future, as well as collaborating with others to create more complex and innovative projects. </p>

                </div>
                
                <div class="scroll-card">
                    <h3> Hobbies and Interests </h3>
                        <p> Outside of programming, I enjoy gaming, playing Yu-Gi-Oh and hanging out with friends. I have a passion for learning new things and exploring new technologies. </p>
                        <p> I also have an interest in studying malware for analysis and learning the intricacies of malicious software. </p>
                        <p> I was part of a tennis and volleyball team in High School for 2 years each and occasionally enjoy playing the 2 </p>
                        <p> These sports have helped me develop teamwork skills, as strong sense of competition to become better and develop my work ethic. </p>
                        <img class="hologram-image" src="personalSRC/tennis.jpg">
                        <p> I have a passion for music as well, listening to a variety of genres such as rap, hip-hop, kpop, metal, rock and much more. I love listening to music while working on playing video games or even building a deck in Yu-Gi-Oh </p>
                        <p> I really enjoy Round 1, the arcade, and I love trying out new sports as well and working out.</p>
                        <p> I really love editing and producing videos as a past time as well, especially making gaming skits for a friend and his channel.</p>
            </div>
        `
    },
    'socials-card': {
        loading: '<h2>System</h2><br><p>Establishing Machine Link connections...</p>',
        actual: `
            <div class="hologram-scroll-area">
                <h2 style="margin-bottom: 20px;">Comms Network</h2>
            
                <div class="scroll-card">
                    <a href="https://www.instagram.com/e.deguzman0324/" target="_blank" class="social-link">
                    <img class="hologram-image" src="personalSRC/instagram.png">
                        <h3>[ Instagram ]</h3>
                        <p>Follow me on Instagram!</p>
                    </a>
                </div>

                <div class="scroll-card">
                    <a href="https://github.com/edeguzman05" target="_blank" class="social-link">
                        <h3>[ GitHub ]</h3>
                        <p>Access my code repositories and active UI builds.</p>
                        <img class="hologram-image" src="src/github.png"
                        <p> [UNDER CONSTRUCTION]</p>
                    </a>
                </div>

                <div class="scroll-card">
                    <a href="https://www.linkedin.com/in/emmanuel-de-guzman-45888b3a0/" target="_blank" class="social-link">
                    <img class="hologram-image" src="personalSRC/LinkedIn.png">
                        <h3>[ LinkedIn ]</h3>
                        <p>Connect with me!.</p>
                    </a>

                </div>
            </div>

            <div class="scroll-card">
                    <a href="https://www.twitch.tv/ahegarara" target="_blank" class="social-link">
                        <h3>[ Twitch ]</h3>
                        <p>Follow me on Twitch!</p>
                        <img class="hologram-image" src="src/Virus.png"
                    </a>

            </div>
        `
    },
    'projects-card': { loading: '<h2>System</h2><p>Initializing...</p>', actual: '<p>Projects coming soon...</p>' },
    
    'contact-card': { loading: `<h2>System</h2><p>Initializing...</p>`, 
                      actual: `<div class="hologram-scroll-area">
                                    <div class="scroll-card">
                                        <h3> Contact Information </h3>
                                        <p> Email: edeguzmanjr05@gmail.com </p>
        `
    }
};

document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card || activeCard === card) return;

    if (activeCard) {
        returnCardToHand(activeCard);
    }
    summonCard(card);
});

// 2. Summon Logic
function summonCard(card) {
    const targetZone = document.getElementById('monster-zone-3');
    targetZone.appendChild(card);
    
    // Always add 'flipped' class so the card stays upright
    card.classList.add('summoned', 'flipped');
    activeCard = card;

    // Load Hologram Content
    if (pageData[card.id]) {
        hologram.classList.remove('hologram-hidden');
        hologramContent.innerHTML = pageData[card.id].actual;
        
        // Initialize observer for the new content
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 }); 

        document.querySelectorAll('.scroll-card').forEach(c => observer.observe(c));
    }
}

// 3. Return Logic
function returnCardToHand(card) {
    const handContainer = document.querySelector('.hand');
    card.classList.remove('summoned');
    handContainer.appendChild(card);
    activeCard = null;
}
// 4. End Turn Button
returnBtn.addEventListener('click', () => {
    if(!activeCard) return;
    
    // 1. Hide the hologram
    hologram.classList.add('hologram-hidden');
    
    // 2. Remove the summoned animation class
    activeCard.classList.remove('summoned');
    
    // 3. MOVING THE CARD BACK
    // This moves the card from the monster-zone back into the .hand
    handContainer.appendChild(activeCard); 
    
    // 4. Reset the variable
    activeCard = null;
});