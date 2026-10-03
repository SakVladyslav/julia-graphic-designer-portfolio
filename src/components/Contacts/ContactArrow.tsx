import contactArrowUrl from "../../assets/contact-arrow.svg";

export default function ContactArrow() {
  return (
    <span className="contact-arrow" aria-hidden="true">
      <img src={contactArrowUrl} alt="" width={16} height={16} aria-hidden="true" />
    </span>
  );
}
