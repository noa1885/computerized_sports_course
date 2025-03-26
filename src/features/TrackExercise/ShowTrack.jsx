import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTrackByIdClient } from "./TrackExerciseslice"; // Redux slice
import { useNavigate } from 'react-router-dom';

const ShowTracks = (trackId) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  
  // שליפת פרטי המשתמש מהסטור
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Fetch all tracks for the client only if user is available
    const fetchTracks = async () => {
      if (user?.id) {
        // dispatch מחזיר פעולה אסינכרונית, אז צריך לחכות לתוצאה
        const result = await dispatch(getTrackByIdClient(user.id));
        
        // הנחה כאן ש-getTrackByIdClient מחזיר את הנתונים ישירות
        if (result.payload) {
          setTracks(result.payload); // אם התוצאה לא ריקה, עדכון המידע ב-state
        }
      }
    };
    fetchTracks();
  }, [dispatch, user]);

  const handleTrackClick = (trackId) => {
    navigate(`/track-details/${trackId}`);
  };

  return (
    <div>
      <h1>All Tracks</h1>
      {tracks.length > 0 ? (
        tracks.map(track => (
          <div key={track.id} onClick={() => handleTrackClick(track.id)}>
            <h2>Track {track.id} - {track.date}</h2>
          </div>
        ))
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  );
};

export default ShowTracks;
