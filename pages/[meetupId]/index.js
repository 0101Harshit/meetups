import { MongoClient, ObjectId } from "mongodb";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
  return (
    <MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.desciption}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://harshit:harshit@cluster0.he7j7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://harshit:harshit@cluster0.he7j7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupId = context.params.meetupId;
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: 
      {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
}
