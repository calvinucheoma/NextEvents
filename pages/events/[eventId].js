import { Fragment } from 'react';

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

function EventDetailPage(props) {
  const { selectedEvent } = props;

  if (!selectedEvent) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  // if (!selectedEvent) {
  //   return (
  //     <ErrorAlert>
  //       <p>No event found!</p>
  //     </ErrorAlert>
  //   );
  // }

  return (
    <Fragment>
      <Head>
        <title>{selectedEvent.title}</title>
        <meta
          name={selectedEvent.description}
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const singleEvent = await getEventById(eventId);

  return {
    props: {
      selectedEvent: singleEvent,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
