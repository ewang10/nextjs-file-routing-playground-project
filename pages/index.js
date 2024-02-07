import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = ({ featuredEvents }) => (
    <div>
        <EventList events={featuredEvents} />
    </div>
);

export default HomePage;

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            featuredEvents
        },
        revalidate: 1800
    };
}