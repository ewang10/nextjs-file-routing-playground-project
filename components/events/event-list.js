import EventItem from "./event-item";

import classes from './event-list.module.css';

const EventList = ({ events }) => (
    <ul className={classes.list}>
        {
            events.map((event) => <EventItem key={event.id} event={event} />)
        }
    </ul>
);

export default EventList;
