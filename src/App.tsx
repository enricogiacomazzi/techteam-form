import React, { ChangeEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import './App.css';
import { useForm } from 'react-hook-form';

interface userFormModel {
  firstname: string;
  lastname: string;
  age: string;
  gender?: 'Male' | 'Female' | 'NB'
}

interface userFormValidModel {
  firstname: boolean;
  lastname: boolean;
  age: boolean;
  gender: boolean;
}

interface userFormDirtyModel {
  firstname: boolean;
  lastname: boolean;
  age: boolean;
  gender: boolean;
}



const App: React.FC = () => {

  const {register, handleSubmit, formState} = useForm<userFormModel>()

  const save = (e: any) => {
    
    console.log('salva', e);
  }

  const ageRgx = /^\d+$/;

  console.log('fs', formState.errors);

  return (
    <form onSubmit={handleSubmit(save)}>
    <div className="form-group">
      <label htmlFor="firstname">Nome</label>
      <input type="text" id="firstname" placeholder="nome"
        className={classNames({'form-control': true, 'is-invalid': !!formState.errors.firstname, 'is-valid': false})} 
        {...register("firstname", {required: true})}/>
        {(!!formState.errors.firstname) && <div className="invalid-feedback">
          Il Nome è richiesto
      </div>}
    </div>
    <div className="form-group">
      <label htmlFor="lastname">Cognome</label>
      <input type="text"
      id="lastname" placeholder="cognome"
        className={classNames({'form-control': true, 'is-invalid': !!formState.errors.lastname, 'is-valid': false})}
        {...register("lastname", {required: true})}/>
      {(!!formState.errors.lastname) && <div className="invalid-feedback">
          Il Cognome è richiesto
      </div>}
    </div>
    <div className="form-group">
      <label htmlFor="age">Età</label>
      <input type="text" id="age" placeholder="Età"
      className={classNames({'form-control': true, 'is-invalid': !!formState.errors.age, 'is-valid': false})}
      {...register("age", {required: true, pattern: ageRgx})}/>
      {(!!formState.errors.age) && <div className="invalid-feedback">
          {formState.errors.age.type === 'required' && <span>Età obbligatoria</span>}
          {formState.errors.age.type === 'pattern' && <span>Età errata</span>}
      </div>}
    </div>
    <div className="form-group">
      <div className="form-check">
        <input className="form-check-input" type="radio" id="male" value="Male" {...register("gender", {required: true})}/>
        <label className="form-check-label" htmlFor="male">
          Maschio
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" id="Female" value="Female" {...register("gender", {required: true})}/>
        <label className="form-check-label" htmlFor="Female">
          Femmina
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" id="NB" value="NB" {...register("gender", {required: true})}/>
        <label className="form-check-label" htmlFor="NB">
          Non binario
        </label>
      </div>
      {(!!formState.errors.gender || true) && <div style={{color: 'red'}}>Specificare genere</div>}
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default App;
