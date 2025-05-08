document.addEventListener('DOMContentLoaded', function() {
    // スライド関連の要素
    const slideFrame = document.getElementById('slideFrame');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    // スライド制御用の変数
    const totalSlides = 11;
    let currentSlide = 1;
    let autoPlayInterval = null;
    let isPlaying = false;
    
    // スライドを更新する関数
    function updateSlide() {
        slideFrame.src = `slides/slide${currentSlide}.html`;
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }
    
    // 前のスライドに移動
    function prevSlide() {
        currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
        updateSlide();
    }
    
    // 次のスライドに移動
    function nextSlide() {
        currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
        updateSlide();
    }
    
    // 自動再生の切り替え
    function toggleAutoPlay() {
        if (isPlaying) {
            clearInterval(autoPlayInterval);
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            autoPlayInterval = setInterval(nextSlide, 5000); // 5秒ごとに次のスライド
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // イベントリスナーの設定
    prevBtn.addEventListener('click', function() {
        if (isPlaying) toggleAutoPlay(); // 自動再生中なら停止
        prevSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        if (isPlaying) toggleAutoPlay(); // 自動再生中なら停止
        nextSlide();
    });
    
    playPauseBtn.addEventListener('click', toggleAutoPlay);
    
    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                prevSlide();
                if (isPlaying) toggleAutoPlay();
                break;
            case 'ArrowRight':
            case ' ': // スペースキー
                nextSlide();
                if (isPlaying) toggleAutoPlay();
                break;
            case 'p': // pキー
                toggleAutoPlay();
                break;
        }
    });
    
    // 初期スライドの表示
    updateSlide();
});
