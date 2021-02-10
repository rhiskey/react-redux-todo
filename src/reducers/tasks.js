// Чистая функция  = 1) возвращает точно такой же результат каждый раз при вызове с тем же набором аргументов. 2) Выполнение ф-ии не влияет за пределами области видимости
import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK } from '../constants';
import { load } from 'redux-localstorage-simple';

let TASKS = load({ namespace: 'todo-list' });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS = {
    tasks: [],
  }
}

// const TASKS = [
//   {
//     id: 1,
//     text: 'Milk - 1 carton',
//     isCompleted: true,
//   },
//   {
//     id: 2,
//     text: 'Eggs - 10 pieces',
//     isCompleted: false,
//   },
//   {
//     id: 3,
//     text: 'Potatos - 2 kg',
//     isCompleted: false,
//   }
// ];

//Передача в store
//строка action выносим в константу -> не словить ошибку когда меняем тип action в reducer
const tasks = (state = TASKS.tasks, { id, text, isCompleted, type }) => {
  switch (type) {
    case ADD_TASK:
      return [
        ...state, {
          id: id,
          text: text,
          isCompleted: isCompleted
        }
      ];
    case REMOVE_TASK: //Сравниваем ID текущей задачи с массивом всех. Копия стэйта с помощью spread
      return [...state].filter(task => task.id !== id);
    case COMPLETE_TASK: //Сравниваем ID текущей задачи с массивом всех. Копия стэйта с помощью spread
      return [...state].map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      });
    default:
      return state;
  }
}

export default tasks;
