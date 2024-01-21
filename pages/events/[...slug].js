import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const yearMonthValidation = (year, month) => (
    isNaN(year) ||
    isNaN(month) ||
    year < 2021 ||
    year > 2023 ||
    month < 1 ||
    month > 12
);
const FilteredEventsPage = () => {
    const { query: { slug } } = useRouter();

    if (!slug) {
        return <p className='center'>Loading...</p>
    }

    const [year, month] = slug;
    const numYear = +year;
    const numMonth = +month;

    if (yearMonthValidation(numYear, numMonth)) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

    if (!filteredEvents || !filteredEvents.length) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList events={filteredEvents} />
        </>
    );
};

export default FilteredEventsPage;
