import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { IoIosSearch } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import useCustomeHooks from "./Hooks/useCustomeHooks";
import AddNadUpdatecontact from "./components/AddNadUpdatecontact";
import ContactNotFound from "./components/ContactNotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useCustomeHooks();

  useEffect(() => {
    const getContacts = async () => {
      const contactsRef = collection(db, "contacts");

      /*.....used for real time update onSnapshot.... */

      onSnapshot(contactsRef, (snapshot) => {
        const contacsLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contacsLists);
        return contacsLists;
      });
    };
    getContacts();
  }, []);

  const filteredContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contacsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contacsLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <main className="bg-current max-w-[360px] m-auto p-4 rounded-lg mt-[60px]">
      <div className="mx-auto max-w-[370px]  ">
        <NavBar />
        <div className="flex gap-2">
          <div className=" relative flex items-center flex-grow">
            <IoIosSearch className="absolute text-white text-3xl ml-2" />
            <input
              onChange={filteredContacts}
              type="text"
              placeholder="Search Contact"
              className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-11 text-white"
            />
          </div>

          <MdAddCircle
            className="text-white text-5xl cursor-pointer"
            onClick={onOpen}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {contacts.length == 0 ? (
            <ContactNotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddNadUpdatecontact isOpen={isOpen} onClose={onClose} />
    </main>
  );
};
export default App;
