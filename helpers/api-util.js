export async function getAllEvents() {
    const response = await fetch(process.env.FIREBASE_EVENTS_URL);
    const data = await response.json();
    const events = [];

    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        });
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();

    return allEvents.filter(({ isFeatured }) => isFeatured);
}

export async function getEventById(eventId) {
    const allEvents = await getAllEvents();

    return allEvents.find(({ id }) => id === eventId);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();

    const filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return filteredEvents;
}
