import ContactActionItem from "./ContactActionItem";
import ContactDetailItem from "./ContactDetailItem";

import { contactActions, contactDetails } from "../../constants/contacts";

import "./Contacts.scss";

export default function Contacts() {
  return (
    <section className="contacts" id="contacts" aria-labelledby="contacts-heading">
      <h2 id="contacts-heading">Contacts</h2>
      <div className="contacts-layout">
        <ul className="contact-list">
          {contactDetails.map((detail) => (
            <ContactDetailItem key={detail.id} detail={detail} />
          ))}
        </ul>
        <div className="contact-actions">
          {contactActions.map((action) => (
            <ContactActionItem key={action.id} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}
