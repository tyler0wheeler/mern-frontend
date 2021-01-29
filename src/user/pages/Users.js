import React from 'react';

import UsersList from '../components/UsersList'
const Users = () => {
    const USERS = [{id: 'u1', 
    name: 'Tyler', 
    image:'https://upload.wikimedia.org/wikipedia/en/0/06/Fallout_76_cover.jpg', 
    places: 3}]


    return <UsersList items={USERS}/>
}
export default Users;