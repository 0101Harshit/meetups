import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211",
//     address: "Some address 5, 1234 some city",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1200px-Stadtbild_M%C3%BCnchen.jpg?20130611211",
//     address: "Some address 5, 1234 some city",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetupData} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data
//   return {
//     props: {
//       meetupData: DUMMY_DATA,
//     },
//   };
// }

export async function getStaticProps() {
  //sent http request and fetch data

  const client = await MongoClient.connect(
    "mongodb+srv://harshit:harshit@cluster0.he7j7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  return {
    props: {
      meetupData: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
export default HomePage;
