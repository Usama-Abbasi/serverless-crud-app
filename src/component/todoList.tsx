import React, { useState, useEffect } from 'react'
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import styles from './todoList.module.css';
const baseURL=".netlify/functions/crud/";
import Swal from 'sweetalert2';
const deleteTodo = async (id) => {
    console.log(id);
    return await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'A todo is deleted',
                showConfirmButton: false,
                timer: 1500
              })
            return data;
        })
        .catch(err => console.log(err))
}
const TodoList=({ key, id, message,isChange})=> {
    // console.log()
    return (
        <ul className={styles.list} key={key}>
        <li>
          <div className={styles.title}>
            <h3>{message} </h3>
          </div>

          <div>
            <Button onClick={()=>{deleteTodo(id);
            isChange()}}>
              <DeleteIcon />
            </Button>
            {/* <Button onClick={() => updateNote(id, input)}>
              <UpdateIcon />
            </Button> */}
          </div>
        </li>
      </ul>
    )
}
export default TodoList
