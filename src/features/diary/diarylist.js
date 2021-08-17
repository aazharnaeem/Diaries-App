import React ,{useState}from 'react'
import { TextField, Box, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
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

export const Diarylist = () => {

    const classes = useStyles();

    const { diaries } = useSelector(state => state.diary)

    const [hide, sethide] = useState(true)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isPrivate, setisPrivate]= useState('')
    const [id, setid] = useState(0)

    const dispatch = useDispatch()

    const update = () => {
        sethide(true)
        const path = `/diary/update/${id}`
        const data = { title: 'updatednew', isPrivate: true, content: 'updated diary' }
        http.put(path, data).then((res) => {
            if (res) {
                dispatch(updatePage(res))
            } else {
                console.log('cant')
            }
        })
    }

    const remove = (id) => {
        const path = `/diary/${id}`
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
            <Box component="div" m={1} 
            style={{ display: hide ? 'none' : 'block' }}
            >
                <Button
                    varient='outlined'
                    color='primary'
                    style={{ textalign: 'rignt' }}
                    onClick={() => { sethide(true) }} >
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

                <RadioGroup name="isPrivate" value={isPrivate} onChange={(e) => setisPrivate(e.target.value)}>
                    <FormControlLabel value="false" control={<Radio />} label="Public" />
                    <FormControlLabel value="true" control={<Radio />} label="Private" />
                </RadioGroup>

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
                    ADD
                </Button>
            </Box>
            <h1>Diaries</h1>
            {diaries.map((values, index) => {
                const id = values.id

                return (
                    <div
                        key={index}
                    >

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
                                                onClick={() => sethide(true)+setid(id)}>
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

                                        <Grid item>
                                            <Link
                                                to={`entry/${id}`}
                                                style={{ textDecoration: 'none' }}>
                                                <Button
                                                    variant="outlined"
                                                    color='primary'
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => console.log('entries')}>
                                                    Entries
                                                </Button>
                                            </Link>

                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        < br />
                    </div>
                )
            })}


        </div>
    )
}