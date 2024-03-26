import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { db,auth } from "../firebase";
import { onValue, ref, update } from "firebase/database";
import "firebase/auth";

// import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const query = ref(db, "appointments");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      // console.log(Object.keys(snapshot.val())[0])
      if (snapshot.exists()) {
        setAppointments([]);
        Object.values(data).map((appointment, i) => {
          appointment.uid = Object.keys(snapshot.val())[i];
          setAppointments((appointments) => [...appointments, appointment]);
        });
        console.log(appointments);
      }
    });
  }, [db]);

  return (
    <div class="mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Date and time
            </th>
            <th scope="col" class="px-6 py-3">
              Disease
            </th>
            <th scope="col" class="px-6 py-3">
              User ID
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>

            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter((app) => app.status === "Pending"|| app.doctorName===auth.currentUser?.displayName) // todo fitler by doctor id
            .map((appointment) => (
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {appointment.dateTime}
                </th>
                <td class="px-6 py-4">{appointment.disease}</td>
                <td class="px-6 py-4">{appointment.userId}</td>
                <td class="px-6 py-4">{appointment.status==="Accepted"?"Accepted By You":appointment.status}</td>

                <td class="px-6 py-4">
               { appointment.status==="Accepted"?<></>:
                  <a
                    onClick={() => {
                      const query = ref(db, "appointments/"+appointment.uid);
                      return update(query, {...appointment,status:"Accepted",doctorName:auth.currentUser?.displayName,doctorContactNo:auth.currentUser?.email})
                       
                      // firebase
                      // .database()
                      // .ref("/appoinments/" + app.uid)
                      // .on("value")
                      // .then((snapshot) => {
                      //   this.setState({ from_status: snapshot.val().status });
                      // });
                    }}
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Accept
                  </a>}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pins;
