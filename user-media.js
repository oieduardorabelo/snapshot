function $ (element) {
  return document.querySelector(element)
}

function $$ (element) {
  return document.querySelectorAll(element)
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

var video            = $('.camera-video')
var snapshotCanvas   = $('.camera-picture')
var snapshotCtx      = snapshotCanvas.getContext('2d')
var takenPictures    = $('.taken-pictures')
var userMediaOptions = { video: true }

function createImage (event) {
  var snapshotPhoto = snapshotCanvas.toDataURL('image/png')
  var image = new Image()
  var imageDownload = document.createElement('a')

  image.src = snapshotPhoto
  image.className = 'taken-picture'

  imageDownload.href = snapshotPhoto
  imageDownload.setAttribute('download', "taken-picture.png")
  imageDownload.appendChild(image)

  if ( takenPictures.firstElementChild ) {
    takenPictures.insertBefore(imageDownload, takenPictures.firstElementChild)
  } else {
    takenPictures.appendChild(imageDownload)
  }
}

function snapshot (event) {
  var videoWidth = video.getBoundingClientRect().width / 2
  var videoHeight = video.getBoundingClientRect().height / 2

  snapshotCanvas.height = videoHeight
  snapshotCanvas.width = videoWidth

  snapshotCtx.drawImage(video, 0, 0, videoWidth, videoHeight)

  createImage()
}

function createUserInterface () {
  video.parentElement.addEventListener('click', snapshot, false)
  snapshotCanvas.addEventListener('click', createImage, false)

  return video
}

function createStream (stream) {
  var video = createUserInterface()

  video.src = window.URL.createObjectURL(stream)
}

function errorGetCamera (error) {
  console.log('Ocorreu um erro ao tentar acessar a câmera')
}

function openCamera () {
  navigator.getUserMedia(userMediaOptions, createStream, errorGetCamera)
}

openCamera()
