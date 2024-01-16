import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();
    console.log({featuredEvents})

    return (
        <div>
            <EventList events={featuredEvents}/>
        </div>
    );
};

export default HomePage;
