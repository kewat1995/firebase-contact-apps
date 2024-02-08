import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import AddNadUpdatecontact from "./AddNadUpdatecontact";
import useCustomeHooks from "../Hooks/useCustomeHooks";
const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useCustomeHooks();
  const contactsDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));

      toast.success("Delete has been successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-yellow flex items-center  justify-between rounded-lg p-2  ">
        <div className="flex gap-2 ">
          <FaRegUserCircle className="text-orange text-4xl " />
          <div>
            <h2 className="text-xl font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-2 text-3xl">
          <FaEdit className=" cursor-pointer" onClick={onOpen} />
          <MdDelete
            className=" text-blue-800 cursor-pointer"
            onClick={() => contactsDelete(contact.id)}
          />
        </div>
      </div>
      <AddNadUpdatecontact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
        AddNadUpdatecontact
      />
    </>
  );
};
export default ContactCard;
