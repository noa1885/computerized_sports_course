import React, { useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrackByIdClient } from "./TrackExerciseSlice";  // Import from Redux slice
import { Card, CardContent, CardHeader, Typography, Button } from '@mui/material';

const TrackDetails = () => {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the Redux state
  const { currentTrack, status, message } = useSelector(state => state.track);

  useEffect(() => {
    dispatch(getTrackByIdClient(trackId)); // Dispatch Redux action to fetch track details
  }, [dispatch, trackId]);

  // Handle different loading states
  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>{message}</div>;

  // Handle case where no track is found
  if (!currentTrack) return <div>No track found</div>;

  return (
    <div style={{ padding: '16px' }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
        <CardHeader title={`Track #${currentTrack.id}`} subheader={`Date: ${new Date(currentTrack.date).toLocaleDateString()}`} />
        <CardContent>
          <Typography variant="h6">Track Details</Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Duration:</strong> {currentTrack.duration} minutes
          </Typography>
          <Typography variant="h6" gutterBottom>Exercises:</Typography>
          
          {/* Check if trackExercises exists and is an array before mapping */}
          {Array.isArray(currentTrack.trackExercises) && currentTrack.trackExercises.length > 0 ? (
            currentTrack.trackExercises.map(exercise => (
              <div key={exercise.id}>
                <Typography variant="body1"><strong>{exercise.fitnessExercise.name}</strong></Typography>
                <Typography variant="body2" color="textSecondary">Mark: {exercise.mark}</Typography>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No exercises available for this track</Typography>
          )}
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={() => navigate(`/track-exercises/${currentTrack.id}`)}>
        View Exercises
      </Button>
    </div>
  );
};

export default TrackDetails;
