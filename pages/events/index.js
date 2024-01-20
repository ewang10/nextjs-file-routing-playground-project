import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = () => {
    const events = getAllEvents();
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


export default AllEventsPage;
