import whatsappIcon from "../assets/whatsapp.svg";

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/4473989071934"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#25d366",
        color: "white",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={whatsappIcon}
        alt="WhatsApp"
        style={{
          width: "38px",
          height: "38px",
        }}
      />
    </a>
  );
}
