'use client'
import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";

interface SearchParamProps {
  params: {
    userId: string;
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  let patient = null;

  try {
    patient = await getPatient(userId);
    console.log("Paciente encontrado:", patient);
  } catch (error) {
    console.error("Erro ao buscar o paciente:", error);
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-8 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id || ""}
          />

          <p className="copyright mt-10 py-12 text-center">
            © {new Date().getFullYear()} CarePulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
        onError={(e) => console.error("Erro ao carregar a imagem:", e)}
      />
    </div>
  );
}
