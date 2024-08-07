import React from 'react';
import { useForm } from 'react-hook-form';
const Notebar = ({add_Note}) => {
  const { register, handleSubmit ,reset, formState:{errors}} = useForm();
  return (
    <div className="todo-search">

          <form action="" onSubmit={handleSubmit(data=>{add_Note(data);reset()})}>
            <input type="text" id="task" placeholder="Enter Todo" {...register("task",{ required:true})} />
            
            <button>Add</button>
          </form>

          {errors.task?.type == "required" && <small>This field is required</small>}
      </div>
  );
};

export default Notebar;