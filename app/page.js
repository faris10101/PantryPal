// app/page.js
'use client'; // Ensure this is present to indicate client-side component

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, List, ListItem, ListItemText, IconButton, Paper, Divider } from '@mui/material';
import { db } from '../components/firebase'; // Correct path to your firebase.js
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import styles from './page.module.css'; // Import CSS module

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsData);
      setFilteredItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrUpdateItem = async () => {
    if (editId) {
      await updateDoc(doc(db, 'pantry', editId), {
        name: itemName,
        quantity: quantity
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, 'pantry'), {
        name: itemName,
        quantity: quantity
      });
    }
    setItemName('');
    setQuantity('');
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, 'pantry', id));
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredItems(filtered);
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography variant="h4" align="center" gutterBottom className={styles.header}>
        Pantry Tracker
      </Typography>
      <Paper className={styles.paper}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <TextField
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={styles.textField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={styles.textField}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateItem}
              className={styles.button}
            >
              {editId ? 'Update Item' : 'Add Item'}
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.textField}
            />
          </Grid>
        </Grid>
      </Paper>
      <Divider className={styles.divider} />
      <List>
        {filteredItems.map(item => (
          <ListItem key={item.id} divider className={styles.listItem}>
        <ListItemText 
  primary={`${item.name} - ${item.quantity}`} 
  style={{ color: '#000' }} 
/>

            <IconButton 
              className={styles.iconButton} 
              onClick={() => {
                setItemName(item.name);
                setQuantity(item.quantity);
                setEditId(item.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              className={styles.iconButton} 
              onClick={() => handleDeleteItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Home;
