import React, { ChangeEvent, FormEvent, useState } from 'react';
import classNames from 'classnames';
import './App.css';

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
  const [formState, setFormState] = useState<userFormModel>({
    firstname: '',
    lastname: '',
    age: '',
    gender: undefined
  });

  const [formValid, setFormValid] = useState<userFormValidModel>({
    firstname: false,
    lastname: false,
    age: false,
    gender: false
  });

  const [formDirty, setFormDirty] = useState<userFormDirtyModel>({
    firstname: false,
    lastname: false,
    age: false,
    gender: false
  });

  const setInput = (e: ChangeEvent<HTMLInputElement>) => { 
    const value = e.target.value;
    const name = e.target.name;
    let valid = false;
    switch(name) {
      case 'firstname':
        valid = value.length > 0;
        break;
      case 'lastname':
        valid = value.length > 0;
        break;
      case 'age':
        valid = value.length > 0 && !isNaN(parseFloat(value));
        break;
      case 'gender':
        valid = ['Male', 'Female', 'NB'].includes(value);
        break;
    }
    setFormDirty({...formDirty, [name]: true});
    setFormValid({...formValid, [name]: valid});
    setFormState({...formState, [name]: value});
  }

  const isFormValid = () => {
    // @ts-ignore
    return Object.keys(formValid).every(k => formValid[k]);
  }

  const save = (e: FormEvent<HTMLFormElement>) => {
    console.log('aaaaa submit')
    e.preventDefault();
    if(!isFormValid()) {
      alert('controlla i tuoi dati');
      return;
    }
    
    console.log('salva', formState);
  }

  return (
    <form onSubmit={save}>
    <div className="form-group">
      <label htmlFor="firstname">Nome</label>
      <input type="text" 
      className={classNames({'form-control': true,
        'is-invalid': !formValid.firstname && formDirty.firstname, 'is-valid': formValid.firstname && formDirty.firstname})} 
      id="firstname" name="firstname" placeholder="nome"
      value={formState.firstname} onChange={setInput}/>
      {(!formValid.firstname && formDirty.firstname) && <div className="invalid-feedback">
          Il Nome è richiesto
      </div>}
    </div>
    <div className="form-group">
      <label htmlFor="lastname">Cognome</label>
      <input type="text"
      className={classNames({'form-control': true, 
        'is-invalid': !formValid.lastname && formDirty.lastname, 'is-valid': formValid.lastname && formDirty.lastname})} 
      id="lastname" name="lastname" placeholder="cognome"
      value={formState.lastname} onChange={setInput}/>
      {(!formValid.lastname && formDirty.lastname) && <div className="invalid-feedback">
         Il Cognome è richiesto
      </div>}
    </div>
    <div className="form-group">
      <label htmlFor="age">Età</label>
      <input type="text"
       className={classNames({'form-control': true,
       'is-invalid': !formValid.age && formDirty.age, 'is-valid': formValid.age && formDirty.age})} 
      id="age" name="age" placeholder="Età"
      value={formState.age} onChange={setInput}/>
      {(!formValid.age && formDirty.age) && <div className="invalid-feedback">
         Età non valida
      </div>}
    </div>
    <div className="form-check">
      <input type="radio" className="form-radio-input" name="gender" value="Male" onChange={setInput}/><span>Maschio</span><br/>
      <input type="radio" className="form-radio-input" name="gender" value="Female" onChange={setInput}/><span>Femmina</span><br/>
      <input type="radio" className="form-radio-input"  name="gender" value="NB" onChange={setInput}/><span>Non binario</span><br/>
    </div>
    <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Submit</button>
    </form>
  )
}

export default App;
