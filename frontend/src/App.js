// import logo from './logo.svg';
// import './App.css';
import React, { useEffect } from 'react';
import { AppBar, Toolbar,IconButton, Typography, Button, Box ,TextField ,TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {

  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})


  // const CRUD functions from axios
  const fetchUsers = async ()=>{
    const response = await axios.get('http://localhost:8000/')
    return setUsers(response.data)
  }
  // fetchUsers() // autoload all data
  // fetch Id
  const fetchUser = async (id)=>{
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }//
  // create or edit users
  const createOrEditUser = async ()=>{
    if (user.id){
      await axios.put(`http://localhost:8000/${user.id}`, user)
    } else {
      await axios.post('http://localhost:8000/', user)
    }
    await fetchUsers()
    await setUser({id: 0, name: '', email: '', password: ''})
  }//
  // delete user
  const deleteUser = async (id)=>{
      await axios.delete(`http://localhost:8000/${id}`)
      await fetchUsers()
  }//

  // Fetch all users on first page load
  useEffect(()=>{
      fetchUsers()
  },[])


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin-Dashboard Sample
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box m={10}>
      <TableContainer>
      <Table aria-label="admin table">
      <TableHead>
      <TextField value={user.id} type="hidden"></TextField>
        <TableRow>
        <TableCell>
        <TextField value={user.name} onChange={(e)=>setUser({...user, name:e.target.value})} id="standard-basic" label="Name" />
        </TableCell>
        <TableCell>
        <TextField value={user.email} onChange={(e)=>setUser({...user, email:e.target.value})} id="standard-basic" label="Email" />
        </TableCell>
        <TableCell>
        <TextField value={user.password} onChange={(e)=>setUser({...user, password:e.target.value})} id="standard-basic" label="Password" />
        </TableCell>
        <TableCell>
          <Button onClick={()=> createOrEditUser()} variant="contained" color='primary'>
            Submit
          </Button>
        </TableCell>
        <TableCell>
          <Button onClick={()=> fetchUsers()} variant="contained">
            Reload
          </Button>
        </TableCell>
        </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (

            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>
              <Button onClick={()=> fetchUser(row.id)} variant="contained" color="primary">
                Edit
                </Button>
              </TableCell>
              <TableCell>
              <Button onClick={()=> deleteUser(row.id)} variant="contained" color="secondary">
                Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </div>
  );
}

export default App;
