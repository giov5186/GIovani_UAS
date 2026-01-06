document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // 2. DARK MODE DENGAN LOCAL STORAGE (FITUR PRO)
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Cek apakah user sebelumnya memilih dark mode
    if (localStorage.getItem('theme') === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeBtn.innerText = '☀️'; // Ubah ikon jadi matahari
    }

    themeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            themeBtn.innerText = '🌙';
            localStorage.setItem('theme', 'light'); // Simpan preferensi
        } else {
            html.setAttribute('data-theme', 'dark');
            themeBtn.innerText = '☀️';
            localStorage.setItem('theme', 'dark'); // Simpan preferensi
        }
    });

    // 3. SCROLL PROGRESS BAR
    window.onscroll = function() { updateProgressBar() };

    function updateProgressBar() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

    // 4. AUTO COPY BUTTON UNTUK CODE BLOCKS
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Buat wrapper agar tombol bisa diposisikan absolute relatif terhadap pre
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        // Pindahkan pre ke dalam wrapper
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);

        // Buat tombol copy
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copy';

        button.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                button.innerText = 'Copied!';
                setTimeout(() => { button.innerText = 'Copy'; }, 2000);
            });
        });

        wrapper.appendChild(button);
    });
    
    // 5. TYPING EFFECT UNTUK JUDUL HALAMAN (Index Only)
    const heroTitle = document.querySelector('.hero h1');
    if(heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Kecepatan mengetik
            }
        }
        typeWriter();
    }
});