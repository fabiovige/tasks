import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap';
import api from '../../../services/api';
import moment from 'moment';

// import { Container } from './styles';
interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {

  const history = useHistory()
  const { id } = useParams()
  const [ task, setTask ] = useState<ITask>()

  useEffect(() => {
    console.log(id)
    if (id !== undefined) {
      findTask(id)
    }
    
  }, [id])

  function back(){
    history.goBack()
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format('DD/MM/YYYY')
  }
  
  async function findTask(id:number) {
    const response = await api.get<ITask>(`/tasks/${id}`)
    console.log(response)
    setTask(response.data)
  }

  return (
    <div className="container">
      <br/>
      <div className="task-header"> 
        <h1>Tasks Detail</h1>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br/>
      <Card>
        <Card.Body>
          <Card.Title>{ task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br/>
            <Badge variant={task?.finished ? "success" : "warning"}>
              {task?.finished ? "Finalizado" : "Pendente"}
            </Badge>
            <br/>
            <span className="sm">Data de Cadastro:</span>{' '}
            <Badge variant="info">
              {formatDate(task?.created_at)}
            </Badge>
            <br/>
            <span className="sm">Data de Atualização:</span>{' '}
            <Badge variant="info">
              {formatDate(task?.updated_at)}
            </Badge>
            
          </Card.Text>
        </Card.Body>
      </Card>

      <br/>
    </div>
  )
}

export default Detail;