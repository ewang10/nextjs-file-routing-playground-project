import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = () => {
    const { query: { eventId } } = useRouter();
    const event = getEventById(eventId);

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        );
    }

    const { title, description, location, image, date } = event;

    return (
        <>
            <EventSummary title={title} />
            <EventLogistics date={date} address={location} image={image} imageAlt={title}/>
            <EventContent>
                <p>{description}</p>
            </EventContent>
        </>
    );
}

export default EventDetailPage;
