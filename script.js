/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("show");

});


/* Close mobile menu after clicking a link */

const navItems =
    document.querySelectorAll(".nav-links a");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navLinks.classList.remove("show");

    });

});


/* =========================
   SERVICE OPTIONS
========================= */

const serviceOptions = {

    hospital: [
        "Doctor Consultation",
        "General Check-up",
        "Registration",
        "Blood Test",
        "Pharmacy"
    ],

    bank: [
        "Cash Deposit",
        "Cash Withdrawal",
        "Account Opening",
        "Customer Service",
        "Loan Enquiry",
        "KYC Update"
    ],

    barber: [
        "Haircut",
        "Shaving",
        "Haircut + Shaving",
        "Beard Grooming",
        "Facial",
        "Head Massage",
        "Hair Spa"
    ]

};


/* =========================
   QUEUE DATA
========================= */

const queueData = {

    hospital: {
        name: "CityCare Hospital",
        currentToken: 40,
        yourToken: 45
    },

    bank: {
        name: "SmartBank Customer Service",
        currentToken: 18,
        yourToken: 22
    },

    barber: {
        name: "StyleCut Barber Shop",
        currentToken: 7,
        yourToken: 10
    }

};


/* =========================
   QUEUE ELEMENTS
========================= */

const selectedService =
    document.getElementById("selectedService");

const currentToken =
    document.getElementById("currentToken");

const yourToken =
    document.getElementById("yourToken");

const peopleAhead =
    document.getElementById("peopleAhead");

const waitTime =
    document.getElementById("waitTime");

const queueProgress =
    document.getElementById("queueProgress");

const progressText =
    document.getElementById("progressText");

const simulateBtn =
    document.getElementById("simulateBtn");

const resetBtn =
    document.getElementById("resetBtn");


/* Store original queue values */

let activeQueue = "hospital";

let originalData =
    JSON.parse(
        JSON.stringify(queueData)
    );


/* =========================
   DAILY TOKEN LIMIT
========================= */

const MAX_DAILY_TOKENS = 5;


/* Token history */

let tokenHistory =
    JSON.parse(
        localStorage.getItem("smartQueueTokens")
    ) || [];


/* =========================
   UPDATE QUEUE DISPLAY
========================= */

function updateQueueDisplay() {

    const data =
        queueData[activeQueue];


    selectedService.textContent =
        data.name;


    currentToken.textContent =
        "#" + data.currentToken;


    yourToken.textContent =
        "#" + data.yourToken;


    let people =
        data.yourToken -
        data.currentToken -
        1;


    if (people < 0) {

        people = 0;

    }


    peopleAhead.textContent =
        people;


    let waiting =
        people * 5;


    if (waiting < 0) {

        waiting = 0;

    }


    waitTime.textContent =
        waiting + " min";


    /* Calculate progress */

    let total =
        data.yourToken -
        (data.yourToken - 5);


    let completed =
        data.currentToken -
        (data.yourToken - 5);


    let progress =
        (completed / total) * 100;


    if (progress < 0) {

        progress = 0;

    }


    if (progress > 100) {

        progress = 100;

    }


    queueProgress.style.width =
        progress + "%";


    progressText.textContent =
        Math.round(progress) + "%";

}


/* =========================
   SERVICE SWITCHING
========================= */

const queueButtons =
    document.querySelectorAll(
        ".queue-select-btn"
    );


queueButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        queueButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        activeQueue =
            button.getAttribute("data-queue");


        updateQueueDisplay();

    });

});


/* =========================
   SIMULATE NEXT TOKEN
========================= */

simulateBtn.addEventListener("click", function () {

    const data =
        queueData[activeQueue];


    if (data.currentToken < data.yourToken) {

        data.currentToken++;

        updateQueueDisplay();

    } else {

        alert(
            "Your turn has arrived! Please proceed to the counter."
        );

    }

});


/* =========================
   RESET QUEUE
========================= */

resetBtn.addEventListener("click", function () {

    queueData[activeQueue] =
        JSON.parse(
            JSON.stringify(
                originalData[activeQueue]
            )
        );


    updateQueueDisplay();

});


/* =========================
   HERO LIVE QUEUE
========================= */

let heroToken = 40;


const heroCurrentToken =
    document.getElementById(
        "heroCurrentToken"
    );


const heroWaitTime =
    document.getElementById(
        "heroWaitTime"
    );


setInterval(function () {

    if (heroToken < 45) {

        heroToken++;


        heroCurrentToken.textContent =
            heroToken;


        const remaining =
            45 - heroToken;


        heroWaitTime.textContent =
            (remaining * 5) + " min";

    }

}, 5000);


/* =========================
   JOIN QUEUE MODAL
========================= */

const modal =
    document.getElementById(
        "queueModal"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalService =
    document.getElementById(
        "modalService"
    );


const queueForm =
    document.getElementById(
        "queueForm"
    );


const tokenResult =
    document.getElementById(
        "tokenResult"
    );


const generatedToken =
    document.getElementById(
        "generatedToken"
    );


const serviceButtons =
    document.querySelectorAll(
        ".service-btn"
    );


/* Open modal */

serviceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const service =
            button.getAttribute(
                "data-service"
            );


        modalService.textContent =
            service;


        /* Get service dropdown */

        const serviceType =
            document.getElementById(
                "serviceType"
            );


        /* Clear old options */

        serviceType.innerHTML = "";


        /* Identify selected category */

        let selectedCategory;


        if (service === "Hospital / Clinic") {

            selectedCategory =
                "hospital";

        } else if (service === "Bank") {

            selectedCategory =
                "bank";

        } else if (service === "Barber Shop") {

            selectedCategory =
                "barber";

        }


        /* Add only related services */

        serviceOptions[selectedCategory]
            .forEach(function (option) {

                const optionElement =
                    document.createElement(
                        "option"
                    );


                optionElement.value =
                    option;


                optionElement.textContent =
                    option;


                serviceType.appendChild(
                    optionElement
                );

            });


        tokenResult.classList.remove(
            "show"
        );


        queueForm.style.display =
            "block";


        modal.classList.add("show");

    });

});


/* =========================
   CLOSE MODAL
========================= */

modalClose.addEventListener("click", function () {

    modal.classList.remove("show");

});


/* Close modal when clicking outside */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


/* =========================
   GENERATE UNIQUE TOKEN
========================= */

function generateTokenNumber(category) {

    const categoryTokens =
        tokenHistory.filter(function (token) {

            return token.category === category;

        });


    let tokenNumber;


    do {

        tokenNumber =
            Math.floor(
                Math.random() * 50
            ) + 1;


    } while (

        categoryTokens.some(function (token) {

            return token.tokenNumber === tokenNumber;

        })

    );


    return tokenNumber;

}


/* =========================
   SAVE TOKEN
========================= */

function saveTokens() {

    localStorage.setItem(
        "smartQueueTokens",
        JSON.stringify(tokenHistory)
    );

}


/* =========================
   GET TODAY'S TOKEN COUNT
========================= */

function getTodayTokenCount() {

    const today =
        new Date()
            .toLocaleDateString("en-IN");


    return tokenHistory.filter(function (token) {

        /*
           Old tokens without createdAt
           are ignored for today's count.
        */

        if (!token.createdAt) {

            return false;

        }


        const tokenDate =
            new Date(token.createdAt)
                .toLocaleDateString("en-IN");


        return tokenDate === today;

    }).length;

}


/* =========================
   UPDATE TOKEN COUNT
========================= */

function updateTokenCount() {

    const todayTokenCount =
        getTodayTokenCount();


    const activeTokenCount =
        document.getElementById(
            "activeTokenCount"
        );


    if (activeTokenCount) {

        activeTokenCount.textContent =
            todayTokenCount +
            " / " +
            MAX_DAILY_TOKENS;

    }

}


/* =========================
   RENDER TOKEN HISTORY
========================= */

function renderTokenHistory() {

    const historyContainer =
        document.getElementById(
            "tokenHistory"
        );


    updateTokenCount();


    if (tokenHistory.length === 0) {

        historyContainer.innerHTML = `

            <div class="empty-history">

                <div class="empty-icon">
                    🎫
                </div>

                <h3>
                    No Tokens Yet
                </h3>

                <p>
                    Join a queue to see your token history here.
                </p>

                <a
                    href="#services"
                    class="btn primary-btn"
                >
                    Join a Queue
                </a>

            </div>

        `;


        return;

    }


    historyContainer.innerHTML = "";


    tokenHistory.forEach(function (token) {

        const tokenCard =
            document.createElement("div");


        tokenCard.className =
            "history-card";


        let statusClass =
            token.status.toLowerCase();


        tokenCard.innerHTML = `

            <div class="history-icon">
                ${token.icon}
            </div>


            <div class="history-info">

                <h3>
                    ${token.business}
                </h3>

                <p>
                    ${token.service}
                </p>

                <span class="history-date">
                    ${token.date}
                </span>

            </div>


            <div class="history-token">

                <span>
                    Token
                </span>

                <strong>
                    #${token.tokenNumber}
                </strong>

            </div>


            <div class="history-status">

                <span
                    class="status ${statusClass}"
                >
                    ${token.status}
                </span>


                ${
                    token.status === "Waiting"
                    ?
                    `
                    <button
                        class="cancel-token"
                        data-id="${token.id}"
                    >
                        Cancel
                    </button>
                    `
                    :
                    ""
                }

            </div>

        `;


        historyContainer.appendChild(
            tokenCard
        );

    });


    addCancelEvents();

}


/* =========================
   CANCEL TOKEN
========================= */

function addCancelEvents() {

    const cancelButtons =
        document.querySelectorAll(
            ".cancel-token"
        );


    cancelButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const tokenId =
                    Number(
                        button.getAttribute(
                            "data-id"
                        )
                    );


                const token =
                    tokenHistory.find(
                        function (item) {

                            return item.id === tokenId;

                        }
                    );


                if (token) {

                    token.status =
                        "Cancelled";


                    saveTokens();


                    renderTokenHistory();

                }

            }
        );

    });

}


/* =========================
   GET CATEGORY
========================= */

function getCategoryFromService(service) {

    if (
        service ===
        "Hospital / Clinic"
    ) {

        return "hospital";

    }


    if (service === "Bank") {

        return "bank";

    }


    if (service === "Barber Shop") {

        return "barber";

    }

}


/* =========================
   GET ICON
========================= */

function getServiceIcon(category) {

    if (category === "hospital") {

        return "🏥";

    }


    if (category === "bank") {

        return "🏦";

    }


    if (category === "barber") {

        return "💈";

    }


    return "🎫";

}


/* =========================
   GET BUSINESS NAME
========================= */

function getBusinessName(category) {

    if (category === "hospital") {

        return "CityCare Hospital";

    }


    if (category === "bank") {

        return "SmartBank";

    }


    if (category === "barber") {

        return "StyleCut Barber Shop";

    }

}


/* =========================
   SUBMIT TOKEN
========================= */

queueForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "userName"
            )
            .value
            .trim();


        /* Name validation */

        if (name === "") {

            alert(
                "Please enter your name."
            );

            return;

        }


        /* =========================
           DAILY TOKEN LIMIT
        ========================= */

        const todayTokenCount =
            getTodayTokenCount();


        if (
            todayTokenCount >=
            MAX_DAILY_TOKENS
        ) {

            alert(
                "Daily token limit reached. You can take maximum 5 tokens per day."
            );

            return;

        }


        /* Get selected category */

        const selectedServiceCategory =
            modalService.textContent;


        const category =
            getCategoryFromService(
                selectedServiceCategory
            );


        /* Get selected service */

        const serviceType =
            document.getElementById(
                "serviceType"
            ).value;


        /* Generate token */

        const tokenNumber =
            generateTokenNumber(
                category
            );


        /* =========================
           CREATE NEW TOKEN
        ========================= */

        const newToken = {

            id: Date.now(),

            name: name,

            category: category,

            business:
                getBusinessName(
                    category
                ),

            icon:
                getServiceIcon(
                    category
                ),

            service:
                serviceType,

            tokenNumber:
                tokenNumber,

            status:
                "Waiting",

            date:
                new Date()
                    .toLocaleString(
                        "en-IN"
                    ),

            createdAt:
                new Date()
                    .toISOString()

        };


        /* Add token to history */

        tokenHistory.push(
            newToken
        );


        /* Save token */

        saveTokens();


        /* Update history */

        renderTokenHistory();


        /* Show generated token */

        generatedToken.textContent =
            "#" + tokenNumber;


        queueForm.style.display =
            "none";


        tokenResult.classList.add(
            "show"
        );

    }
);


/* =========================
   INITIAL LOAD
========================= */

updateQueueDisplay();

renderTokenHistory();