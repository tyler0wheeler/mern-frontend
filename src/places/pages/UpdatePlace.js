import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './PlaceForm.css'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card'


const DUMMY_PLACES = [
    {
        id:'p1',
        title: 'Empire State Build',
        description: 'One of the most famous buildings in the world',
        imageUrl: 'https://newyorkyimby.com/wp-content/uploads/2020/09/DSCN0762-777x1036.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'

    },
    {
        id:'p2',
        title: 'Emp State Build',
        description: 'One of the most famous buildings in the world',
        imageUrl: 'https://newyorkyimby.com/wp-content/uploads/2020/09/DSCN0762-777x1036.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'

    }
]


const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true)
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)

    const indentifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    useEffect(() => {
        if (indentifiedPlace) {
            setFormData({
                title: {
                    value: indentifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: indentifiedPlace.description,
                    isValid: true
                }
            }, true)
        }
        setIsLoading(false)
    }, [setFormData, indentifiedPlace])
    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs);
    }

    if (!indentifiedPlace) {
        return <div className="center">
            <Card>
                <h2>Could not find Place</h2>
            </Card>
        </div>
    }
    if (isLoading) {
        return <div className="center">
            <Card>
            <h2>Loading</h2>
            </Card>
        </div>
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
            id="title" 
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            />
            <Input 
            id="description" 
            element="textarea"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)"
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    )
        
}

export default UpdatePlace