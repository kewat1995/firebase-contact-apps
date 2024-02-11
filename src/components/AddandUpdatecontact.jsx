/* eslint-disable react/prop-types */

import Model from "./Model";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactShemaValidations = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});
const AddandUpdatecontact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactsRef = collection(db, "contacts");
      await addDoc(contactsRef, contact);
      onClose();
      toast.success("Add Contacts has been successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const contactsUpdate = async (contact, id) => {
    try {
      const contactsRef = doc(db, "contacts", id);
      await updateDoc(contactsRef, contact, id);
      onClose();
      toast.success("Update has been successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactShemaValidations}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? contactsUpdate(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col ">
            <div className="flex flex-col gap-2 p-2">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10 " />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <label htmlFor="email">Email</label>
              <Field name="email" className="border h-10 " />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-amber-400 self-end px-2 py-1.5 text-lg rounded-lg  mt-2"
            >
              {isUpdate ? "Update" : "Add"} contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};
export default AddandUpdatecontact;
