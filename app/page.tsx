import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen bg-slate-600">
      <section className="remove-scroll-bar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-8 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
            <Link
              href="/?adm=true"
              className="text-green-500"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="doctor"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
