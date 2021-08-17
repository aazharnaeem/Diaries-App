import React, { useState } from 'react'
import { TextField, Box, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import http from '../../utils/api';
import { updatePage } from '../update-Slice';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export const Entrylist = () => {

    const classes = useStyles();

    const entries = useSelector(state => state.entry.entries)
    const dispatch = useDispatch()

    const [hide, sethide] = useState(true)
    const [title, setTitle] = useState('')
    const [content, setContent]= useState('')
    const [id, setid] = useState(0)

    const update = () => {
        sethide(true)
        const path = `/entry/${id}`
        const data = { title, content}
        http.put(path, data).then((res) => {
            if (res) {
                dispatch(updatePage(res))
            } else {
                console.log('cant')
            }
        })
    }

    const remove = (id) => {
        const path = `/entry/${id}`
        http.delete(path).then((res) => {
            if (res) {
                dispatch(updatePage(res))
            } else {
                console.log('cant')
            }
        })
    }

    return (
        <div>

            <div>
                <Box component="div" m={1} style={{ display: hide ? 'none' : 'block' }}>
                    <Button
                        varient='outlined'
                        color='primary'
                        style={{ textalign: 'rignt' }}
                        onClick={() => { sethide(true) }}
                    >
                        X
                    </Button>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="title"
                        label="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoComplete="title"
                        autoFocus
                        fullWidth
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="content"
                        label="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        autoComplete="content"
                        autoFocus
                        fullWidth
                    />
                    <br />
                    <Button
                        variant='outlined'
                        color='primary'
                        style={{ width: '100%' }}
                        onClick={() => update()}
                    >
                        update
                    </Button>
                </Box>
                <h1>Entries</h1>

            </div>
            {entries.map((values, index) => {
                // console.log(values.id)
                const id = values.id

                return (
                    <div
                        key={index}
                    >
                        {/* <Link
                        to={`entry/${values.id}`}
                        key={index}
                        style={{ textDecoration: 'none' }}> */}

                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>

                                <Grid item>
                                </Grid>


                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>

                                            <Typography gutterBottom variant="subtitle1">
                                                <strong>
                                                    <li>
                                                        {values.title}
                                                    </li>

                                                </strong>
                                            </Typography>

                                            <Typography variant="body2" gutterBottom>
                                                <dd>
                                                    {values.content}
                                                </dd>
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                    <Grid container>

                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color='primary'
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => sethide(false) + setid(id)}>
                                                Edit
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color='primary'
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => remove(id)}>
                                                Remove
                                            </Button>
                                        </Grid>

                                    </Grid>



                                </Grid>
                            </Grid>
                        </Paper>
                        < br />
                        {/* </Link> */}
                    </div>

                )
            })
            }



        </div>
    )
}