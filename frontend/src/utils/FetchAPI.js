/*
Sending HTTP requests using a custom hook
*/

import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http'
import Tasks from './FetchedItems';

function FetchAPI() {
  const [touched, setTouched] = useState(false)
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      //for (const taskKey in tasksObj) {
      //  loadedTasks.push({text: tasksObj[taskKey].name });
     // }
     loadedTasks.push(tasksObj)

      setTasks(loadedTasks);
    };

    fetchTasks(
      { url: 'https://swapi.dev/api/people/1' },
      transformTasks
    );
    setTouched(true)
  }, [fetchTasks]);

  

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <div>
    {tasks}{error}
    </div>
  );
}
export default FetchAPI;
