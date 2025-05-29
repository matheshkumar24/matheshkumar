const typewriterEl = document.getElementById("typewriter");
const startBtn = document.getElementById("startBtn");
const music = document.getElementById("bgMusic");

const storyClassic = (name) => `
Once upon a time, in a world filled with stars and wishes,
a soul named ${name} was born — kind-hearted, radiant, and full of wonder.

Every year, on this very day,
the sky glows a little brighter,
and the world feels a little warmer.

Happy Birthday, ${name}! ✨🎂

May your journey be lined with laughter,
your days soaked in magic,
and your nights full of dreams that come true.

You are the sparkle in the story of today.
And this day... belongs to YOU. 💖
`;

const storyPoetic = (name) => `
In the realm of dreams and stardust skies,
On a day wrapped in cosmic surprise,
A soul was born — bright and true,
The universe whispered, “Here comes ${name} too.”

The moon smiled down, the sun took a bow,
Nature danced in awe somehow.
With laughter woven into fate’s thread,
A magical tale began to spread.

From baby giggles to starry nights,
You’ve chased joy and shining lights.
Through every challenge, high or low,
Your spirit’s warmth began to glow.

Today the winds hum your sweet name,
Even time pauses to play the game.
Candles flicker like hopeful stars,
Celebrating just how loved you are.

So make a wish and let it fly,
With dreams that reach the endless sky.
Happy Birthday, ${name}, you radiant flame — 
The world is brighter because you came. 🌟🎉
`;

function typeText(text, i = 0) {
  if (i < text.length) {
    typewriterEl.textContent += text.charAt(i);
    setTimeout(() => typeText(text, i + 1), 40);
  }
}

function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.pitch = 1.2;
    msg.rate = 0.95;
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
  }
}

startBtn.onclick = async () => {
  const { value: name } = await Swal.fire({
    title: "What's your name?",
    input: "text",
    inputPlaceholder: "Enter your name...",
    confirmButtonText: "Continue",
    background: '#fff0f5',
    confirmButtonColor: '#ff66b2',
  });

  if (!name) return;

  const { value: style } = await Swal.fire({
    title: "Choose your story style:",
    input: "radio",
    inputOptions: {
      classic: "Classic Tale",
      poetic: "Poetic 20-Liner"
    },
    inputValidator: value => !value && "You need to pick one!",
    confirmButtonText: "Begin the tale",
    background: '#fff0f5',
    confirmButtonColor: '#ff66b2',
  });

  if (style) {
    const story = style === 'classic' ? storyClassic(name) : storyPoetic(name);
    typewriterEl.textContent = "";
    music.play();
    typeText(story);
    speak("Happy Birthday " + name + "! Let's begin your magical story.");
    createStars();
    startBtn.style.display = 'none';
  }
};

function createStars() {
  for (let i = 0; i < 60; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.opacity = Math.random();
    document.body.appendChild(star);
  }
}
