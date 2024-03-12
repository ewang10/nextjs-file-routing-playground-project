import Head from 'next/head';
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from '../components/input/newsletter-registration';

const HomePage = ({ featuredEvents }) => (
    <div>
        <Head>
            <title>NextJS Events</title>
            <meta name='description' content='Find a lot of great events that allow you to evolve'/>
        </Head>
        <NewsletterRegistration />
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