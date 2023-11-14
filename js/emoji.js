
function emojiAnimations(containerId, animationPath) {
    lottie.loadAnimation({
        container: document.getElementById(containerId),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
    });
}

emojiAnimations('search-container', 'https://lottie.host/68a3d188-0348-47a2-ba44-58e94ad14aaa/cfaxnW9GN1.json');
emojiAnimations('return-contaier')
emojiAnimations('emoji-container', 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/lottie.json');
emojiAnimations('popcorn-container', 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f37f/lottie.json');
emojiAnimations('drums-container', 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f941/lottie.json');
emojiAnimations('tomato-container', 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f345/lottie.json');




