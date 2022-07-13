import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const MainApp = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
    address: "",
    phoneNumber: "",
  });
  const [add, setAdd] = useState([]);
  console.log(add, "add");
  const dataCollectionRef = collection(db, "datas");
  useEffect(() => {
    const getData = async () => {
      const allData = await getDocs(dataCollectionRef);
      console.log(allData, "all");
      setAdd(allData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [data]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((preData) => {
      return { ...preData, [name]: value };
    });
  };
  const addHandler = async () => {
    await addDoc(dataCollectionRef, {
      name: data.name,
      age: data.age,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });
  };
  const updateData = async (id, age) => {
    const dataDocs = doc(db, "datas", id);
    const newAge = { age: age + 1 };
    await updateDoc(dataDocs, newAge);
  };
  const deleteData = async (id) => {
    const userDoc = doc(db, "datas", id);
    await deleteDoc(userDoc);
  };
  return (
    <>
      <div className="main-app">
        <h1 className="heading">Firebase Demo App</h1>
        <div className="allInputs">
          <input
            placeholder="Add Name"
            value={data.name}
            name="name"
            onChange={changeHandler}
            className="inputField"
          />
          <input
            placeholder="Add age"
            value={data.age}
            name="age"
            onChange={changeHandler}
            className="inputField"
          />
          <input
            placeholder="Add address"
            value={data.address}
            name="address"
            onChange={changeHandler}
            className="inputField"
          />
          <input
            placeholder="Add phoneNumber"
            value={data.phoneNumber}
            name="phoneNumber"
            onChange={changeHandler}
            className="inputField"
          />
          <button type="submit" onClick={addHandler} className="inputField">
            submit
          </button>
        </div>
        <div className="data">
          {add.map((data) => {
            return (
              <div className="data-data">
                <h2>Name : {data.name}</h2>
                <h2>Age : {data.age}</h2>
                <h2>address : {data.address}</h2>
                <h2> phoneNumber : {data.phoneNumber}</h2>
                <button
                  onClick={() => updateData(data.id, data.age)}
                  style={{ width: "200px", height: "30px" }}
                >
                  Increse Age with 1
                </button>
                <button
                  onClick={() => deleteData(data.id)}
                  style={{ width: "200px", height: "30px" }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainApp;
