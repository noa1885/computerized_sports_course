import React, { useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import Exercise from "./Exercise";
import { getExerciseById } from "./exerciseSlice";
import { useNavigate } from "react-router-dom";


const ShowAllTheExercise=(id)=>
{
const dispatch=useDispatch()

  const ShowExercise = async (id) => {
    dispatch(getExerciseById(id)); 
  };

    return(
        <>
        <h1>
            
        </h1>
        </>
    )
}

export default ShowAllTheExercise;