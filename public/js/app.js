// ***********************RATING***********************

const ratings = document.querySelectorAll('.stars i')
const inputRating = document.querySelector('#inputRating')

console.log('START OF JS SCRIPT')




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

$('.partners-carousel-new').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }

    ]
  });





// customer review
$(document).ready(function () {

    $('.slick-carousel-customer-reviews').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false,
        responsive: [

            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]



    });
});




//Product details - 1st section product review carousel
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    focusOnSelect: true,
    responsive: [
        {
          breakpoint: 624,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }]
});



// ***********************TOAST MESSAGE MODAL***********************      NEED TO REDO



const button = document.querySelector('#toastButton');
const closeToast1 = document.querySelector('#closeToast1')
const closeToast2 = document.querySelector('#closeToast2')

if (button) {


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



    const closeToast1 = document.querySelector('#closeToast1')
    const closeToast2 = document.querySelector('#closeToast2')

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
    }

} else {
    () => {
        return
    }
}



// ***********************FORM MODAL***********************

const openFormModalButton = document.querySelector('#write-review-btn');
const formModalHTMLElement = document.querySelector('#review-modal')

if (openFormModalButton) {
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
} else {
    () => {
        return
    }
}


console.log('END OF JS SCRIPT')

