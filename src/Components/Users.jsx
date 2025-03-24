import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ name: "", age: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.age) {
      dispatch(addUser(newUser));
      setNewUser({ name: "", age: "" });
    }
  };

  const handleUpdateUser = (user) => {
    const updatedUser = { ...user, name: user.name + " (עודכן)" };
    dispatch(updateUser(updatedUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1 className="text-xl font-bold">ניהול משתמשים</h1>
      {status === "loading" && <p>טוען...</p>}
      {status === "failed" && <p>שגיאה: {error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - גיל {user.age}
            <button onClick={() => handleUpdateUser(user)}>עדכן</button>
            <button onClick={() => handleDeleteUser(user.id)}>מחק</button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          placeholder="שם"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="גיל"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button onClick={handleAddUser}>הוסף משתמש</button>
      </div>
    </div>
  );
};

export default Users;
