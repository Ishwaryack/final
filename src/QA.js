import React, { useState,useEffect } from "react";
import {
  List,
  Button,
  Modal,
  Grid,
} from "@material-ui/core";
import {Rating} from '@material-ui/lab';
import "./QA.css";
import { db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    left: 400,
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    width: 150,
    margin: "10px",
  },
}));

function QA(props) {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer,setAnswer]=useState('')
  const [rating,setRating]=useState(1)


  const updateQA = () => {
    db.collection("qa").doc(props.id).set(
      {
        question,answer,rating
      },
      { merge: true }
    );
    setQuestion('')
    setAnswer('')
    setOpen(false);
  };


  useEffect(()=>{
    setQuestion(props.question)
    setAnswer(props.answer)
    setRating(props.rating)
  },[open])

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h3>Update the QA</h3>
          <Grid container spacing={3}>
            <Grid item> <input
            placeholder={'question'}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          /></Grid>
             <Grid item><input
            placeholder={'answer'}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          /></Grid>
              <Grid item>
                <Rating value={rating} onChange={(e,val)=>setRating(val)} />
              </Grid>
          </Grid>
           <br/>
           
          <Button
            variant="contained"
            color="default"
            onClick={updateQA}
            className={classes.button}
          >
            Upload ✔
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
          <h2>{props.index}.{props.question}</h2><br/>
           <h4>{props.answer}</h4>
           <Rating value={props.rating} readOnly/><br/>
        <Button
          variant="contained"
          color="secondary"
          onClick={(Event) =>{      
            db.collection("qa").doc(props.id).delete()
          }
        }       
          
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setOpen(true)}
          className={classes.button}
          endIcon={<EditIcon>send</EditIcon>}
        >
          Edit
        </Button>

        
      </List>
    </>
  );
}

export default QA;
