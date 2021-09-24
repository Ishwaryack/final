import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import QA from './QA';
import {db} from './firebase';
import firebase from "firebase"
import {

  Grid,
} from "@material-ui/core";
import { Rating} from '@material-ui/lab'

function App() {


  const [qa,setQA]=useState([])
  const [question,setQuestion]=useState('')
  const [answer,setAnswer]=useState('')
  const [rating,setRating]=useState(0)

  
  useEffect(() => {

  db.collection('qa').orderBy("timestamp", "desc").onSnapshot(snapshot => {
    let _QA = snapshot.docs.map(doc => ({ id:doc.id, question: doc.data().question,answer:doc.data().answer,rating:doc.data().rating}))
 
    setQA(_QA)
  })}, [])


  const addTodo = (Event) => {

    Event.preventDefault();
    
    db.collection('qa').add({
      question,answer,rating,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((response)=>{
      setRating('')
      setQuestion('')
      setAnswer('')
    })


 
  }



  return (
    <div className="App">
     
      <h1 className =  "App-header">QA List </h1>
      <h3>Developed by Ishwarya and Dhanya</h3>
      <form >
        <Grid container spacing={4}>
          <Grid item >
               <Input placeholder='Enter Question' value={question} onChange={Event => setQuestion(Event.target.value)} />
          </Grid>
          <Grid item >
           <Input placeholder='Enter Answer' value={answer} onChange={Event => setAnswer(Event.target.value)} />
          </Grid>
          <Grid item>
            <Rating value={rating} onChange={(e,value)=>setRating(value)}/>
          </Grid>
        </Grid>

      
        <Button disabled={!question && ! answer} type="submit" variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
       
      </form>
      <ul>
        {qa.map((q,i) => (
         <QA question={q.question} answer={q.answer} id={q.id} index={i+1} rating={q.rating}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
