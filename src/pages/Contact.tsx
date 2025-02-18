import ContactForm from "@/components/pages/Contact/ContactForm";
import ContactInfo from "@/components/pages/Contact/ContactInfo";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-12">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-8 underline underline-offset-8  text-center">
        Contact Us
      </h1>
      <div className="grid items-center justify-center gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
