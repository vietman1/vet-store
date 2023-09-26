// ***********************RATING***********************

const ratings = document.querySelectorAll('.stars i')
const inputRating = document.querySelector('#inputRating')





for (let eachRating of ratings) {
    eachRating.addEventListener('click', () => {
        const ratingValue = eachRating.getAttribute("data-rating");
        inputRating.setAttribute('value', ratingValue)


        for (let r of ratings) {
            const starRating = parseInt(r.getAttribute("data-rating"));

            // Adjust the condition to check if starRating is less than or equal to selectedRating
            if (starRating <= ratingValue) {
                r.classList.add("active");
            } else {
                r.classList.remove("active");
            }
        }
    })
}


// ***********************FORM MODAL***********************

const openFormModalButton = document.querySelector('#write-review-btn');
const formModalHTMLElement = document.querySelector('#review-modal')

openFormModalButton.addEventListener('click', () => {
    const formModalElement = new bootstrap.Modal(formModalHTMLElement)
    formModalElement.show()

})

// using the button in the modal instead of the form
const hiddenFormButton = document.querySelector('#hidden-form-button');
const submitFormButton = document.querySelector('#submit-form')

submitFormButton.addEventListener('click', () => {
    hiddenFormButton.click()
})


// ***********************Owl carousel***********************

$('.owl-carousel').owlCarousel({
    center: true,
    items: 3,
    loop: true,
    margin: 100,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    stagePadding: 3,
    responsive: {
        600: {
            items: 2
        }
    },

});


// ***********************Slick carousel***********************
// partners

$(document).ready(function () {
    $('.slick-carousel-partners').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows: true,

    });
});



// customer review
$(document).ready(function () {

    $('.slick-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false
    });
});



// ***********************TOAST MESSAGE MODAL***********************
const button = document.querySelector('#toastButton');
const closeToast1 = document.querySelector('#closeToast1')
const closeToast2 = document.querySelector('#closeToast2')


button.addEventListener('click', () => {
    setTimeout(() => {
        toasty()
    }, 2000);

    setTimeout(() => {
        toasty2()
    }, 4000)

})



const option = {
    animation: true,
    delay: 4000
};


function toasty() {
    const toastHTMLElement = document.getElementById("EpicToast");

    const toastElement = new bootstrap.Toast(toastHTMLElement, option)


    toastElement.show()
}

function toasty2() {
    const toastHTMLElement2 = document.getElementById("EpicToast2");

    const toastElement2 = new bootstrap.Toast(toastHTMLElement2, option)

    toastElement2.show()
}

// Close button
let close = false;
closeToast1.addEventListener(('click'), () => {
    console.log(`closing 1`)

    close = true
})

let close2 = false;
closeToast2.addEventListener(('click'), () => {
    console.log(`closing 2`)
    close2 = true
})


setTimeout(() => {
    console.log('Restarting the toast spam')
    close = false;
    close2 = false;


}, 60000 * 2)


for (let i = 1; i < 20; i++) {


    const delay = 5000 * i;
    setTimeout(() => {
        if (close === false && close2 === false) {
            toasty()
            console.log(`1st toast with i =  ${i} and delay = ${delay}`);

            setTimeout(() => {
                toasty2();
                console.log(`2nd toast with i =  ${i} and delay = ${delay - 2000}`)
            }, delay - 2000)
        }

    }, delay);

    // setTimeout(() => {
    //     if (close2 === false) {
    //         toasty2()
    //         console.log(`2st toast with i =  ${i} and delay = ${delay}`)
    //     }

    // }, delay + 2);


}


// for (let i = 0; i < 20; i++) {


//     const delay = 6000 * i;
//     setTimeout(() => {
//         if (close && close2 === false) {
//             toasty2()
//             console.log(`2st toast with i =  ${i} and delay = ${delay}`)
//         }

//     }, delay);

// }





// for (let i= 0; i<20; i++){
//     const delay = 11000 * i
//     setTimeout(() =>{
//         toasty2()
//         console.log(`2st toast with i =  ${i} and delay = ${delay}`)
//     }, delay + 2000 )

// }



                                        //WRONG NEED TO ASK


// const close = closeToast1.addEventListener(('click'), ()=>{
//     console.log('closed')
//     return true;
// })



// for (let i= 0; i<20; i++){
//     if(close == true) {break;}
//     const delay = 10000 * i;
//     setTimeout(() =>{
//         toasty()
//         console.log(`1st toast with i =  ${i} and delay = ${delay}`)
//     }, delay);
//     // setTimeout(() =>{
//     //     toasty2()
//     //     console.log('2nd toast')
//     // }, delay + 2000 )


// }



// THIS WORKS:


// let stopToasts = false;

// closeToast1.addEventListener('click', () => {
//   console.log('closed');
//   stopToasts = true;
// });

// function scheduleToasty(i) {
//   if (stopToasts) {
//     return; // Stop scheduling if the button is clicked
//   }

//   const delay = 1000 * i;
//   setTimeout(() => {
//     toasty();
//     console.log(`1st toast with i = ${i} and delay = ${delay}`);
//     scheduleToasty(i + 1); // Schedule the next toast
//   }, delay);
// }

// scheduleToasty(0); // Start scheduling toasts




// Form modals

