import { Button, Container, Grid, TextField, makeStyles, Box, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react'
import { Header } from '../../Components/header'
import http from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { updatePage } from '../update-Slice';
import { useLocation, useParams } from 'react-router-dom';
import { addEntries, removeEntries } from './entrySlice';
import { Entrylist } from './entrylist';

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



export const Entry = () => {
    const classes = useStyles();

    const {id} = useParams()
    // console.log(id)
    const temp = useSelector(state => state.update)


    const [hide, setHide] = useState(true)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()



    const submit = () => {

        const data = { title, content }
        setHide(true)

        const path = `/entry/${id}`

        http.post(path, data)
            .then((res) => {
                if (res) {

                    dispatch(updatePage(res))
                    // console.log(res)
                }
            })
            .catch(error => console.log(error))
    }
    const location = useLocation();

    useEffect(() => {
        const path = `/entry/${id}`
        function getEntries() {

            http.get(path).then((res) => {
                if (res === 'no entry exist') {
                    // return <h3>no Entry</h3>
                    // console.log('no Entry')
                    dispatch(removeEntries())
                }
                else{
                    //dispatch to Entries
                    console.log(res, 'response')
                    dispatch(addEntries(res))
                }
            })
        }
        getEntries()
    }, [temp,location])

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
                                Add Entry
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
                    {/* <Diarylist /> */}
                    <Entrylist />
                </Container>
            </Header>
        </div >
    )
}