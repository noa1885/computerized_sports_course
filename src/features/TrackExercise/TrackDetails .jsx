import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrackByIdClient } from "./TrackExerciseslice";  // הייבוא מה־Redux slice

const TrackDetails = () => {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  
  // שליפת הנתונים מ־Redux
  const { currentTrack, status, message } = useSelector(state => state.track);

  useEffect(() => {
    dispatch(getTrackByIdClient(trackId)); // שליחת פעולת Redux לשליפת המסלול
  }, [dispatch, trackId]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{message}</div>;

  if (!currentTrack) return <div>No track found</div>;

  return (
    <div>
      <h1>Track {currentTrack.id} - {currentTrack.date}</h1>
      {currentTrack.trackExercises.map(exercise => (
        <div key={exercise.id}>
          <h3>{exercise.fitnessExercise.name}</h3>
          <p>Mark: {exercise.mark}</p>
        </div>
      ))}
    </div>
  );
};

export default TrackDetails;
