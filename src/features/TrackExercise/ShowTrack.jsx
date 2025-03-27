import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrackByIdClient } from "./TrackExerciseSlice"; 
import { Card, CardContent, CardHeader, CardActions, Typography, Button } from '@mui/material';

const ShowTracks = () => {  
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([]);
  const [expandedTrackId, setExpandedTrackId] = useState(null); // Track ID for which exercises should be shown
  const [expandedTrackDetailsId, setExpandedTrackDetailsId] = useState(null); // Track ID for which details should be shown
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const fetchTracks = async () => {
      if (!user?.id) return;
      try {
        const result = await dispatch(getTrackByIdClient(user.id));  
        if (result.payload) {
          console.log(result.payload)
          const formattedTracks = Array.isArray(result.payload) ? result.payload : [result.payload];
          setTracks(formattedTracks);
        }
      } catch (error) {
        console.error("❌ Error fetching tracks:", error);
      }
    };

    fetchTracks();
  }, [dispatch, user]);

  const toggleExercisesVisibility = (trackId) => {
    setExpandedTrackId(expandedTrackId === trackId ? null : trackId); // Toggle exercises visibility
  };

  const toggleTrackDetailsVisibility = (trackId) => {
    setExpandedTrackDetailsId(expandedTrackDetailsId === trackId ? null : trackId); // Toggle track details visibility
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom>All Tracks</Typography>
      {tracks.length > 0 ? (
        tracks.map(track => (
          <Card key={track.id} sx={{ width: '100%', maxWidth: 600, marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader title={`Track #${track.id}`} subheader={`Date: ${new Date(track.date).toLocaleDateString()}`} />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                <strong>Duration:</strong> {track.duration} minutes
              </Typography>
            </CardContent>
            <CardActions>
              {/* Toggle Track Details */}
              <Button onClick={() => toggleTrackDetailsVisibility(track.id)} variant="contained" color="secondary">
                {expandedTrackDetailsId === track.id ? "Collapse Details" : "Expand Track Details"}
              </Button>

              {/* Toggle Exercises */}
              <Button onClick={() => toggleExercisesVisibility(track.id)} variant="contained" color="primary">
                {expandedTrackId === track.id ? "Hide Exercises" : "View Exercises"}
              </Button>
            </CardActions>

            {/* Display Track Details when expanded */}
            {expandedTrackDetailsId === track.id && (
              <CardContent>
                <Typography variant="h6" gutterBottom>Track Details:</Typography>
                {/* Add additional track details here */}
                <Typography variant="body1" color="textSecondary">
                  <strong>Description:</strong> {track.description || "No description available."}
                </Typography>
                {/* You can add other properties like location, trainer, etc. */}
              </CardContent>
            )}

            {/* Display exercises when expanded */}
            {expandedTrackId === track.id && (
              <CardContent>
                <Typography variant="h6" gutterBottom>Exercises:</Typography>
                {track.trackExercises && track.trackExercises.length > 0 ? (
                  track.trackExercises.map(exercise => (
                    <div key={exercise.id}>
                      <Typography variant="body1"><strong>{exercise.fitnessExercise.name}</strong></Typography>
                      <Typography variant="body2" color="textSecondary">Mark: {exercise.mark}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">No exercises available for this track</Typography>
                )}
              </CardContent>
            )}
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">No tracks available</Typography>
      )}
    </div>
  );
};

export default ShowTracks;
