//mengamati elemen yand dilewatkan
const observer = new IntersectionObserver((entries) => {
    //menjalankan fungsi setiap ada perubahan
    entries.forEach((entry) => {
        //ngetes aja
        console.log('tes');
        //menjalankan fungsi jika melewati kelasnya
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        //jika tidak mau terus menerus dapat di comment
        else {
            entry.target.classList.remove('show');
        }


    });
});


//Menselect semua kelas bernama hidden
const hiddenElement = document.querySelectorAll('.hidden');

hiddenElement.forEach((el) => observer.observe(el));