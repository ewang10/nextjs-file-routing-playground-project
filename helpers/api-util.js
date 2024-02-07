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
