import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../redux/users/usersSlice'

const Users = () => {
    const users = useSelector((state) => state.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    },[dispatch]);

    return (
        <div>
            <h1>Users</h1>
            {users.isLoading && <div>Loading...</div>}
            {!users.isLoading && users.error ? <div>Error:{users.error}</div> : null}
            {!users.isLoading && users.users.length ?(
                <ul>
                    {users.users.map(user => (
                        <li key={user.login.uuid}>{user.name.first}, {user.name.last}</li>))}
                </ul>) : null}
        </div>
    )
}

export default Users;