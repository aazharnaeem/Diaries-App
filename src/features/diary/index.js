import { Button, Container, Grid, TextField, makeStyles, Box, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react'
import { Header } from '../../Components/header'
import http from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { addDiaries } from './diarySlice';
import { updatePage } from '../update-Slice';
import { Diarylist } from './diarylist';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));



export const Diary = () => {
    const classes = useStyles();

    const id = useSelector(state => state.user.users.id)
    const temp = useSelector(state => state.update)


    const [hide, setHide] = useState(true)
    const [isPrivate, setisPrivate] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()



    const submit = () => {

        const data = { title, isPrivate, content }
        setHide(true)

        console.log(data)
        const path = `/diary/add/${id}`

        http.post(path, data)
            .then((res) => {
                if (res) {
                    dispatch(updatePage(res))
                    console.log(res)
                }
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {
        const path = `/diary/get/${id}`
        function getDiaries() {

            http.get(path).then((res) => {
                if (res === 'no diary exist') {
                    return <h3>no diary</h3>
                }
                else {
                    console.log(res)
                    dispatch(addDiaries(res))
                }
            })
        }
        getDiaries()
    }, [temp])

    return (
        <div>
            <Header>
                <Container maxWidth="sm" style={{ border: 'solid 1px #cfe8fc' }}>

                    <Grid container spacing={2} >

                        <Grid item xs={12} sm={6}>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setHide(false)}
                                style={{ width: '100%', padding: '10px', margin: '10px' }} >
                                <AddIcon />
                                Add Diary
                            </Button>
                        </Grid>
                    </Grid>

                    <Box component="div" m={1} style={{ display: hide ? 'none' : 'block' }}>
                        <Button
                            varient='outlined'
                            color='primary'
                            style={{ textalign: 'rignt' }}
                            onClick={() => { setHide(true) }} >
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
                            onClick={() => submit()}
                        >
                            ADD
                        </Button>
                    </Box>
                    <Diarylist />
                </Container>
            </Header>
        </div >
    )
}