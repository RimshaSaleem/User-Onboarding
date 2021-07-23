import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as yup from "yup";
import styled from 'styled-components';

const Result = styled.input`
 
 width:25%;
 height:6vh;
 margin:2%;
 `
 const Styles = styled.h2`
 color:blue;
 margin:0%;
`
 const Styless = styled.button`
 color:grey;
 margin:1%;
 width:10%;
 height:5vh;
 border-radius:5%
 `

export default function Form(props) {

    const { setUsers, users } = props;

    let schema = yup.object().shape({
        name: yup.string().required('Name is Required'),
        email: yup.string().email('Email is Required'),
        password: yup.string().required('Password is Required').min(6, 'Password must be 6 Characters or more'),
        terms: yup.boolean().oneOf([true], "You need to accept Terms and Conditions")
    })


    const defaultErrors = {
        name: '',
        email: '',
        password: '',
        terms: false
    }

    const defaultData = {
        name: '',
        email: '',
        password: '',
        terms: false
    }

    const [formErrors, setFormErrors] = useState(defaultErrors);
    const [formData, setFormData] = useState(defaultData);
    const [buttonDisable, setButtonDisable] = useState(true)

    const setErrors = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => setFormErrors({ ...formErrors, [name]: "" }))
            .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
    };

    const handleChange = (e) => {
        const { value, name, checked, type } = e.target;
        const trueValue = type === 'checkbox' ? checked : value;
        setErrors(name, trueValue)
        setFormData(
            {
                ...formData, [name]: trueValue
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: formData.name.trim(),
            email: formData.email,
            password: formData.password,
            terms: formData.terms
        }
        axios.post(`https://reqres.in/api/users`, newUser)
            .then(res => setUsers([...users, res.data]))
            .catch(err => console.log(err))
        setFormData(defaultData)
    }

    useEffect(() => {
        schema.isValid(formData).then(valid => setButtonDisable(!valid))
    }, [formData])

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"><Styles>Name</Styles>
                    <Result onChange={handleChange} type="text"
                     name='name'
                     data-cy='name'
                      value={formData.name} />
                </label>
                <div  style={{ color: "red" }}>
                    <div>{formErrors.name}</div>
                </div>
                <label htmlFor="email">
                <Styles>Email</Styles>
                    <Result onChange={handleChange} type="email"
                     name='email'
                     data-cy="email"
                      value={formData.email} />
                </label>
                <div  style={{ color: "red" }}>
                    <div>{formErrors.email}</div>
                </div>
                <label htmlFor="password"><Styles>Password</Styles>
                    <Result onChange={handleChange} type="password"
                     name='password'
                     data-cy='password' 
                     value={formData.password} />
                </label>
                <div style={{ color: "red" }}>
                    <div>{formErrors.password}</div>
                </div>
                <label htmlFor="terms"><Styles>Agree To Terms</Styles>
                    <input onChange={handleChange} type="checkbox"
                     checked={formData.terms}
                      name='terms'
                      data-cy='checkbox' />
                </label>
                <div style={{ color: "red" }}>
                    <div>{formErrors.terms}</div>
                </div>
                <Styless name='submit' disabled={buttonDisable} data-cy='submit'>Submit</Styless>
            </form>
        </div>
    )
}