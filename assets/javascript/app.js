//intalize firebase
var config = {
    apiKey: "AIzaSyCQ8Lfbq0f6syDNM3ROAiV-iaRjz93XrBM",
    authDomain: "metro-schedule-e303e.firebaseapp.com",
    databaseURL: "https://metro-schedule-e303e.firebaseio.com",
    projectId: "metro-schedule-e303e",
    storageBucket: "metro-schedule-e303e.appspot.com",
    messagingSenderId: "22295757487"
};

firebase.initializeApp(config);

//variable to reference the database
let database = firebase.database();

//Initial Values
let trainName = "";
let destination = "";
let frequency = "";
let nextArival = "";


// Capture Button Click
$("#add-metro").on("click", function (event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    trainDest = $("#destination-input").val().trim();
    timeOfArr = $("#time-input").val().trim();
    freq = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        trainDestination: trainDest,
        arrivalTime: timeOfArr,
        frequency: freq

    })

    $("#name-input").val('');
    $("#destination-input").val('');
    $("#time-input").val('');
    $("#frequency-input").val('');


});




//function to calulate next train

let firstTime = ""
let tFrequency = ""

//First Time (tFirst) push back 1 year to make sure it comes before surrent time

let firstTimeConverted = moment(firstTime, "HH: mm").subtract(1, "years");

//current time
let time = moment();


//difference between times
let diffTime = moment().diff(moment(firstTimeConverted), "minutes");


//Time apart (remainder)
let tRemainder = diffTime % tFrequency;


//Minute until train
let tMinutesTillTrain = tFrequency - tRemainder;


//Next Train 
let tArrival = moment().add(tMinutesTillTrain, "minutes");



//calls data from firebase to populate table with train information

database.ref().on("child_added", function (snapshot) {

    var trainName = snapshot.val().name
    var dest = snapshot.val().trainDestination
    var tArrival = snapshot.val().arrivalTime
    var trainFreq = snapshot.val().frequency

    $("#trainInfo").append(`<tr><td> ${trainName} </td><td> ${dest} </td><td>${trainFreq}</td><td> ${tArrival}</tr>`);


});

