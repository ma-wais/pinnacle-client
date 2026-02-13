export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/4473989071934"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#25d366",
        color: "#fff",
        width: "60px",
        height: "60px",
        borderRadius: "50px",
        textAlign: "center",
        fontSize: "30px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.0)";
      }}
    >
      <i className="ph-fill ph-whatsapp-logo" style={{ fontSize: "36px" }}></i>
    </a>
  );
}
