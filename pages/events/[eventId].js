import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

const EventDetailPage = ({ event }) => {
    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        );
    }

    const { title, description, location, image, date, id } = event;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
            </Head>
            <EventSummary title={title} />
            <EventLogistics date={date} address={location} image={image} imageAlt={title} />
            <EventContent>
                <p>{description}</p>
            </EventContent>
            <Comments eventId={id}/>
        </>
    );
}

export async function getStaticProps(context) {
    const { params: { eventId } } = context;
    const event = await getEventById(eventId);

    return {
        props: {
            event,
            revalidate: 30
        }
    };
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(({ id }) => ({ params: { eventId: id } }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export default EventDetailPage;
