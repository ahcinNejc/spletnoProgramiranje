const eventsData = {
    monday: [
        {
            title: "Spletno programiranje",
            time: "10:45"
        }
    ],
    tuesday: [
        {
            title: "Spletno programiranje",
            time: "10:45"
        }
    ],
    wednesday: [
        {
            title: "Spletno programiranje",
            time: "10:45"
        }
    ],
    thursday: [],
    friday: [
        {
            title: "Spletno programiranje",
            time: "10:45"
        },
        {
            title: "Informacijska varnost",
            time: "13:15"
        }
    ],
    saturday: [
        {
            title: "Sprostitev",
            time: "12:00"
        }
    ],
    sunday: [],
};


const modal = document.getElementById("event-modal");
const eventForm = document.getElementById("event-form");
const eventTitleInput = document.getElementById("event-title");
const eventTimeInput = document.getElementById("event-time");
let currentDay = null;


function openEventModal(){
    modal.classList.add("modal-active")
    const modalTitle = document.getElementById("modal-title")
    modalTitle.innerHTML = `Add event for ${currentDay}`
}

function closeEventModal(){
    modal.classList.remove("modal-active")
}






document.querySelectorAll(".add-event").forEach(button => {
    button.addEventListener("click", (e) => {
        currentDay = e.target.closest("td").id; // Get the day of the week
        openEventModal(); // Show modal
    });
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeEventModal();
    }
});



eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const eventTitle = eventTitleInput.value;
    const eventTime = eventTimeInput.value;

    if (eventTitle && eventTime && currentDay) {
        const event = { title: eventTitle, time: eventTime };

        // Add event to the data object
        eventsData[currentDay].push(event);

        // Display the event in the table
        renderAllEvents();

        // Clear the input fields
        eventTitleInput.value = '';
        eventTimeInput.value = '';

        // Close the modal
        closeEventModal();

        console.log(eventsData); // Log the current state of the events object
    }
});

function removeEvent(day, index) {
    // Remove the event from the eventsData object
    eventsData[day].splice(index, 1);

    // Re-render all events
    renderAllEvents();

    console.log(`Removed event from ${day} at index ${index}`);
    console.log(eventsData); // Log updated eventsData
}


function renderAllEvents() {
    // Iterate through each day in eventsData
    for (const day in eventsData) {
        const dayCell = document.getElementById(day);
        const eventsDiv = dayCell.querySelector(".events");

        // Clear the current events in the cell
        eventsDiv.innerHTML = '';

        // Sort events for the day by time
        const sortedEvents = eventsData[day].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        // Add sorted events to the cell
        sortedEvents.forEach((event, index) => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");

            // Event text
            const eventText = document.createElement("span");
            eventText.textContent = `${event.title}: ${event.time}`;
            eventDiv.appendChild(eventText);

            // Remove button
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-btn");
            removeButton.addEventListener("click", () => {
                removeEvent(day, index);
            });

            eventDiv.appendChild(removeButton);
            eventsDiv.appendChild(eventDiv);
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {

    // render saved events
    renderAllEvents()

});




