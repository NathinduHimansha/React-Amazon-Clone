import React, { useEffect, useState } from "react";
import { useStateValue } from "../state_management/StateProvider";
import { db } from "../firebase_services/firebase";
import "./orders.css";
import Order from "./Order";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  //retriving orders from db(according to the user)
  // onSnapshot => captures the live(code executing momment) data of the db
  // means its takes the all the data at the time in db according to the releavant selection
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              //data() takes the all data
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);
  console.log("orders:", orders);
  return (
    <div className="orders">
      <h1>Your Orders & Returns</h1>

      <div className="orders__order">
        {orders?.map((item) => (
          <Order order={item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
