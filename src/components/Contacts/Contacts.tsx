import ContactActionItem from "./ContactActionItem";
import ContactDetailItem from "./ContactDetailItem";

import { contactActions, contactDetails, contactLocation } from "../../constants/contacts";
import { CONTACTS_ID } from "../../constants/navigation";

import "./Contacts.scss";

export default function Contacts() {
  return (
    <section className="contacts" id={CONTACTS_ID} tabIndex={-1} aria-labelledby="contacts-heading">
      <h2 id="contacts-heading">Contacts</h2>
      <div className="contacts-layout">
        <ul className="contact-list">
          {contactDetails.map((detail) => (
            <ContactDetailItem key={detail.id} detail={detail} />
          ))}
        </ul>
        <div className="contact-actions">
          <div className="contact-action-stack">
            {contactActions.map((action) => (
              <ContactActionItem key={action.id} action={action} />
            ))}
          </div>
          <p className="contact-location">
            <span className="contact-location-label">{contactLocation}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
