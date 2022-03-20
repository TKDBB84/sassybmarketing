$(function () {

  "use strict"

  //===== Prealoder

  $(window).on('load', function (event) {
    $('.preloader').delay(500).fadeOut(500)
  })


  //===== Mobile Menu

  $(".navbar-toggler").on('click', function () {
    $(this).toggleClass('active')
  })

  $(".navbar-nav a").on('click', function () {
    $(".navbar-toggler").removeClass('active')
  })


  //===== close navbar-collapse when a  clicked

  $(".navbar-nav a").on('click', function () {
    $(".navbar-collapse").removeClass("show")
  })


  //===== Sticky

  $(window).on('scroll', function (event) {
    var scroll = $(window).scrollTop()
    if (scroll < 10) {
      $(".navigation-bar").removeClass("sticky")
    } else {
      $(".navigation-bar").addClass("sticky")
    }
  })


  //===== Section Menu Active

  var scrollLink = $('.page-scroll')
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop()

    scrollLink.each(function () {

      var sectionOffset = $(this.hash).offset().top - 90

      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
      }
    })
  })


  //===== wow

  new WOW().init()


  //===== AOS

  AOS.init({
    duration: 800,
  })


  //===== Slick project

  $('.project-active').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  })


  //===== Slick Testimonial

  $('.testimonial-active').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  })


  //===== Back to top

  // Show or hide the sticky footer button
  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 600) {
      $('.back-to-top').fadeIn(200)
    } else {
      $('.back-to-top').fadeOut(200)
    }
  })

  //Animate the scroll to yop
  $('.back-to-top').on('click', function (event) {
    event.preventDefault()

    $('html, body').animate({
      scrollTop: 0,
    }, 1500)
  })


  $('#email-us').on('click', (e) => {
    if (gtag) {
      gtag('event', 'email-submit')
    }
  })
  $('form').on('submit', (e) => {
    e.preventDefault()
    if (gtag) {
      gtag('event', e.target.id)
    }
    postFormDataAsJson({ url: "/contact", formData: new FormData(e.target) }).then(
      ({ success }) => {
        $('#contact-success').modal('toggle')
        e.target.reset()
      },
    )
  })

  async function postFormDataAsJson({ url, formData }) {
    /**
     * We can't pass the `FormData` instance directly to `fetch`
     * as that will cause it to automatically format the request
     * body as "multipart" and set the `Content-Type` request header
     * to `multipart/form-data`. We want to send the request body
     * as JSON, so we're converting it to a plain object and then
     * into a JSON string.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)

    const fetchOptions = {
      /**
       * The default method for a request with fetch is GET,
       * so we must tell it to use the POST HTTP method.
       */
      method: "POST",
      /**
       * These headers will be added to the request and tell
       * the API that the request body is JSON and that we can
       * accept JSON responses.
       */
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      /**
       * The body of our POST request is the JSON string that
       * we created above.
       */
      body: formDataJsonString,
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }

    return response.json()
  }


})
