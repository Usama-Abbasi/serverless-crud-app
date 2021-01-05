import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TodoList from './todoList';
let TodoSchema = yup.object().shape({
    todo: yup.string().required('This field is required.'),
});
const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 3),
    },
}));
const baseURL = ".netlify/functions/crud/";
const addTodo = async (todo) => {
    var result = await fetch(".netlify/functions/crud/", {
        method: 'POST',
        body: JSON.stringify({ todo })
    });
    console.log(result);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'A todo is added',
        showConfirmButton: false,
        timer: 1500
    })
    return result;
}
const AddTodo = () => {
    const [data, setData] = useState([]);
    const [isChange, setisChange] = useState(false);
    const change = () => {
        setisChange(true);
    }
    useEffect(() => {
        (async () => {
            console.log("fetch called");
            await fetch("/.netlify/functions/crud/")
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    setisChange(false);
                });
        })();
    }, [isChange]);
    console.log(data);
    const classes = useStyles();
    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Formik
                        initialValues={{
                            todo: "",
                        }}
                        validationSchema={TodoSchema}
                        onSubmit={values => {
                            // console.log(values.todo);
                            addTodo(values.todo)
                            setisChange(true);
                        }}
                    >
                        {({ errors, handleChange, touched }) => (
                            <Form className={classes.form}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="todo"
                                            name="todo"
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleChange}
                                            id="todo"
                                            label="Add todo"
                                            autoFocus
                                            helperText={
                                                <span style={{ color: 'red' }}> {errors.todo && touched.todo
                                                    ? errors.todo
                                                    : null}</span>
                                            }
                                        />
                                    </Grid>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Add Todo
                                </Button>
                                </Grid>

                            </Form>

                        )}
                    </Formik>
                </div>

            </Container>
            <div style={{maxWidth:'780px',marginLeft:'270px'}}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        Todo List
          </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: "block" }}>
                    {data?.map((obj) => (
                        <TodoList
                            key={obj.ref["@ref"].id}
                            id={obj.ref["@ref"].id}
                            message={obj.data.todo}
                            isChange={change}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>
            </div>
        </>
    )
}
export default AddTodo;