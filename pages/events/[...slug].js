import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../helpers/api-util";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEventsPage = ({ 
    hasError, 
    filteredEvents,
    date
}) => {
    if (hasError) {
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

    const { numMonth, numYear } = date;
    const dateFilter = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={dateFilter} />
            <EventList events={filteredEvents} />
        </>
    );
};

export async function getServerSideProps(context) {
    const { params: { slug } } = context;

    const yearMonthValidation = (year, month) => (
        isNaN(year) ||
        isNaN(month) ||
        year < 2021 ||
        year > 2023 ||
        month < 1 ||
        month > 12
    );

    const [year, month] = slug;
    const numYear = +year;
    const numMonth = +month;

    if (yearMonthValidation(numYear, numMonth)) {
        return {
            props: {
                hasError: true
            }
        };
    }

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

    return {
        props: {
            filteredEvents,
            date: {
                numMonth,
                numYear
            }
        }
    };
}

export default FilteredEventsPage;
