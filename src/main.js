const electron = require('electron');
const ipc = electron.ipcRenderer;

window.$ = window.jQuery = window.jquery = require("jquery");
window.Velocity = require('velocity-animate');

const clientWindow = require('../modules/ClientWindow');
const WebCamera = require('../modules/WebCamera');

const HomePage = require('../modules/HomePage');
const SecondPage = require('../modules/SecondPage');
const ThirdPage = require('../modules/ThirdPage');
const FourthPage = require('../modules/FourthPage');
const FifthPage = require('../modules/FifthPage');
const GalleryPage = require('../modules/GalleryPage');

const PageManager = require('../modules/PageManager');

let ImageFile = require('../modules/ImageFile');
ImageFile.imageData = '';

$('document').ready(function() {
    clientWindow.start();
});

let webCamera = new WebCamera();

let homePage = new HomePage('home-screen');
let secondPage = new SecondPage('second-screen');
let thirdPage = new ThirdPage('third-screen');
let fourthPage = new FourthPage('fourth-screen');
let fifthPage = new FifthPage('fifth-screen');
let galleryPage = new GalleryPage('gallery-screen');

let pageManager = new PageManager([homePage.name, secondPage.name, thirdPage.name, fourthPage.name, fifthPage.name, galleryPage.name]);

