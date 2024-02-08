import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = ({ events }) => {
    const { push } = useRouter();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;

        push(fullPath);
    };

    return (
        <>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList events={events} />
        </>
    );
};

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events
        },
        revalidate: 60
    };
}

export default AllEventsPage;
