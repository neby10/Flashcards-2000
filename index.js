
// LATER: Ability to start over AND randomize the questions

const flashcards = {
    "title": "Geography",
    "1": {
        "question": "What are the names of the five oceans of the world?",
        "answer": "Atlantic, Pacific, Indian, Arctic, Antarctic",
    },
    "2": {
        "question": "What is the name of the longest river in Africa?",
        "answer": "The Nile River",
    },
    "3": {
        "question": "What American city is the Golden Gate Bridge located in?",
        "answer": "San Francisco",
    },
    "4": {
        "question": "What is the capital of Mexico?",
        "answer": "Mexico City",
    },
    "5": {
        "question": "What U.S. state is home to no documented poisonous snakes?",
        "answer": "Alaska",
    },
    "6": {
        "question": "What is the capital of Canada?",
        "answer": "Ottawa",
    },
    "7": {
        "question": "What is the name of the largest ocean in the world?",
        "answer": "The Pacific Ocean",
    },
    "8": {
        "question": "What present-day Italian city does Mt. Vesuvius overlook?",
        "answer": "Naples",
    },
    "9": {
        "question": "What is the name of the smallest country in the world?",
        "answer": "The Vatican City",
    },
    "10": {
        "question": "What country has the most natural lakes?",
        "answer": "Canada",
    },
    "11": {
        "question": "What planet is closest to Earth?",
        "answer": "Venus",
    },
    "12": {
        "question": "Which country is also called The Netherlands?",
        "answer": "Holland",
    },
    "13": {
        "question": "Where are the Spanish Steps located?",
        "answer": "Rome, Italy",
    },
    "14": {
        "question": "What is the capital of Senegal?",
        "answer": "Dakar",
    },
    "15": {
        "question": "How many time zones does Russia have?",
        "answer": "11",
    },
    "16": {
        "question": "What is the name of the tallest mountain in Canada?",
        "answer": "Mount Logan",
    },
    "17": {
        "question": "What country does the Rhine River run through?",
        "answer": "Germany",
    },
    "18": {
        "question": "What two countries border directly north of Hungary?",
        "answer": "Slovakia and Ukraine",
    },
    "19": {
        "question": "What is the name of the second tallest mountain in the world?",
        "answer": "K2",
    },
    "20": {
        "question": "What type of leaf is on the Canadian flag?",
        "answer": "Maple",
    },
    "21": {
        "question": "What season does Australia experience in December?",
        "answer": "Summer",
    },
    "22": {
        "question": "In which European city was the first organized marathon held?",
        "answer": "Athens",
    },
    "23": {
        "question": "What country formerly ruled Iceland?",
        "answer": "Denmark",
    },
    "24": {
        "question": "What is the name of the largest airport in the United States of America?",
        "answer": "Denver International Airport",
    },
    "25": {
        "question": "What country is known to have the best quality tap water?",
        "answer": "Switzerland",
    },
    "26": {
        "question": "What city is known as the Glass Capital of the World?",
        "answer": "Toledo",
    },
    "27": {
        "question": "How many stars are on the Australian flag?",
        "answer": "6",
    },
    "28": {
        "question": "What US states share a border with Mexico?",
        "answer": "California, Arizona, New Mexico, Texas",
    },
    "29": {
        "question": "What is the name of the flattest state in the US?",
        "answer": "Florida",
    },
    "30": {
        "question": "What state has the fewest counties?",
        "answer": "Delaware",
    },
}

let quizTitle = document.getElementById("quiz-title");

let cardText = document.getElementById("card-text");

let previous = document.getElementById("btns-previous");
let flip = document.getElementById("btns-flip");
let next = document.getElementById("btns-next");

let backToStart = document.getElementById("back-to-start");
let randomize = document.getElementById("randomize");

let current = document.getElementById("number-current");
let total = document.getElementById("number-total");

// VARIABLES
let keyCount = Object.keys(flashcards).length - 1;
let indexTotal = keyCount;
let isFront = true;
let indexCurrent = 1; // current card number

// SETUP
quizTitle.innerHTML = "Subject: " + flashcards.title;
cardText.innerHTML = flashcards[indexCurrent].question;
current.innerHTML = indexCurrent;
total.innerHTML = indexTotal;

function update() {
    cardText.innerHTML = flashcards[indexCurrent].question;
    current.innerHTML = indexCurrent;
    isFront = true;
}

// EVENT LISTENERS
flip.addEventListener("click", () => {
    // change isFront variable
    isFront = !isFront;
    if (isFront) {
        cardText.innerHTML = flashcards[indexCurrent].question;
    } else {
        cardText.innerHTML = flashcards[indexCurrent].answer;
    }
})

previous.addEventListener("click", () => {
    if (indexCurrent > 1) {
        indexCurrent--;
        update();
    }
});

next.addEventListener("click", () => {
    if (indexCurrent < indexTotal) {
        indexCurrent++;
        update();
    }
})

backToStart.addEventListener("click", () => {
    indexCurrent = 1;
    update();
})

randomize.addEventListener("click", () => {
    // temporary variables to help reset json values
    let tempQuestion = "";
    let tempAnswer = "";
    let newKey = "";
    let keysUsed = [];

    // This loop is used to reset the JSON to add indexTotal to each key resulting in a complete different
    //      set of keys. That way the second loop will not overwrite any keys.
    for (let i = 1; i <= indexTotal; i++) {
        // store values
        tempQuestion = flashcards[i].question;
        tempAnswer = flashcards[i].answer;
        // delete key and value
        delete flashcards[i];
        // increment newKey by total
        newKey = i + indexTotal;
        // restore new key and value
        flashcards[newKey] = {"question": tempQuestion, "answer": tempAnswer};
    }

    for (let i = 1 + indexTotal; i <= indexTotal + indexTotal; i++) {
        // store values
        tempQuestion = flashcards[i].question;
        tempAnswer = flashcards[i].answer;
        // delete key and value
        delete flashcards[i];
        // randomize key
        newKey = Math.floor(Math.random() * indexTotal) + 1;
        while (keysUsed.includes(newKey)) {
            newKey = Math.floor(Math.random() * indexTotal) + 1;
        }
        keysUsed.push(newKey);
        // restore new key with value
        flashcards[newKey] = {"question": tempQuestion, "answer": tempAnswer};
    }

    console.log(keysUsed);
    console.log(flashcards);    

    // back to start
    indexCurrent = 1;
    update();
})

// TRIED TO LOAD EXTERNAL JSON

// const flashcards = require("./flashcards.json");

// const flashcards = new Promise ((resolve, reject) => {
//     fetch('./flashcards.json')
//         .then(respond => {
//             resolve(response => respond.json())
//         })
//         .catch(err => {
//             reject(err)
//         })
// })

// let flashcards;
// fetch("./flashcards.json")
// .then(response => response.json())
// .then(data => {
//     // flashcards = data;
//     // flashcards = JSON.stringify(data);
//     // console.log(flashcards);
//     console.log(data);
// })
// .catch((error) => {
//     console.error(error);
// })

// console.log("flashcards: " + flashcards);

// const data = new Promise((resolve, reject) => {
//     fetch('./Data.json')
//         .then(respond => {
//             resolve(respond.json())
//         }).catch(err => {
//             reject(err)
//      })
//     })
    
//     console.log(data)