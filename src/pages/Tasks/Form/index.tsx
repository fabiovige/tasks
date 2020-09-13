import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../services/api';

interface ITask {
  title: string;
  description: string;
}

const Tasks: React.FC = () => {

  const history = useHistory()
  const { id } = useParams()

  const [model, setModel] = useState<ITask>({
    title: '',
    description: ''
  })

  useEffect(() => {
    console.log(id)
    if (id !== undefined) {
      findTask(id)
    }
    
  }, [id])

  function updatedModel(e: ChangeEvent<HTMLInputElement>){
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      await api.put(`/tasks/${id}`, model)
    } else {
      await api.post('/tasks', model)
    }
    
    back()

  }

  async function findTask(id:string) {
    const response = await api.get(`/tasks/${id}`)
    console.log(response)

    setModel({
      title: response.data.title,
      description: response.data.description
    })

  }

  function back() {
    history.goBack()
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header"> 
        <h1>New Task</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>      
      <br/>

      <Form onSubmit={onSubmit}>
        <Form.Group >
          <Form.Label>Título</Form.Label>
          <Form.Control 
            type="text" 
            name="title" 
            value={model.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
          />
        </Form.Group>

        <Form.Group >
          <Form.Label>Descrição</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            name="description"
            value={model.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Salvar
        </Button>

      </Form>
    </div>
    
  )
}

export default Tasks;
