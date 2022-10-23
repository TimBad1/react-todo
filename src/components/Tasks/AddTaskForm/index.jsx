import React, { useState } from 'react';
import './AddTaskform.scss';
import addSvg from '../../../assets/img/add.svg';
import axios from 'axios';

export default function AddTaskform( {list, onAddTask}) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSending,setIsSending] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const obj =     {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsSending(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, obj);
        toggleFormVisible();    
      }).catch(() => {
        alert('Ошибка при добавлении задачи!')
      }).finally(() => {
        setIsSending(false);
      })

    
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
            <img src={addSvg} alt="add icon" className="tasks__" />
            <span className="tasks__">Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-popup">
					<input
            value={inputValue}
						className="field"
						type="text"
						placeholder="Текст задачи" 
            onChange={e => setInputValue(e.target.value)}
          />

          <div className="tasks__form-button-group">
            <button disabled={isSending} onClick={addTask} className="button add-list__button">
              {isSending ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button 
              onClick={toggleFormVisible}
              className="button add-list__button add-list__button-grey"
            >
              Отмена
            </button>
          </div>
				</div>
      )}
        

				
			
    </div>	
  )
}
