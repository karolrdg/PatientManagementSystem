/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
} from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "./CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import {
  createUser,
  registerPatient,
} from "@/lib/actions/patient.actions";
import {
  RadioGroup,
  RadioGroupItem,
} from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";

const RegisterForm = ({
  user,
}: {
  user: User;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [isLoading, setIsLoading] =
    useState(false);

  const form = useForm<
    z.infer<typeof PatientFormValidation>
  >({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(
    values: z.infer<typeof PatientFormValidation>
  ) {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob(
        [values.identificationDocument[0]],
        {
          type: values.identificationDocument[0]
            .type,
        }
      );

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append(
        "fileName",
        values.identificationDocument[0].name
      );
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName:
          values.emergencyContactName,
        emergencyContactNumber:
          values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        allergies: values.allergies,
        currentMedication:
          values.currentMedication,
        familyMedicalHistory:
          values.familyMedicalHistory,
        pastMedicalHistory:
          values.pastMedicalHistory,
        identificationType:
          values.identificationType,
        identificationNumber:
          values.identificationNumber,
        identificationDocument:
          values.identificationDocument
            ? formData
            : undefined,
        privacyConsent: values.privacyConsent,
      };
        // @ts-expect-error 
      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(
          `/patients/${user.$id}/new-appointment`
        );
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-12">
          <h1 className="header">Bem vindo</h1>
          <p className="text-dark-700">
            Conte mais sobre você para começar...
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Informações Pessoais
            </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder="Digite seu nome"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-1 gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="E-mail"
            placeholder="Digite seu email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Telefone"
            placeholder="Digite seu telefone"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Data de nascimento"
            placeholder="Digite seu email"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map(
                    (option, i) => (
                      <div
                        key={option + i}
                        className="radio-group"
                      >
                        <RadioGroupItem
                          value={option}
                          id={option}
                        />
                        <Label
                          htmlFor={option}
                          className="cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    )
                  )}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Endereço"
            placeholder="Digite seu endereço"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Profissão"
            placeholder="Digite sua profissão"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Contato Emergência"
            placeholder="Digite o nome"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Digite o número"
            placeholder=""
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Dados Médicos
            </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Médico/Médica"
          placeholder="Selecione o médico/médica"
        >
          {Doctors.map((doctor) => (
            <SelectItem
              key={doctor.name}
              value={doctor.name}
            >
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt="doctor"
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Seguro Saúde"
            placeholder=""
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Código"
            placeholder="Digite seu código"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Alergias"
            placeholder="Se alguma, digite aqui"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Medicação Atual"
            placeholder="Se alguma, digite aqui"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Histórico Familiar (Doenças)"
            placeholder="Se algum, digite aqui"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Histórico Paciente (Doenças)"
            placeholder="Se algum, digite aqui"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Identificação/Verificação
            </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Tipo de Identificação"
          placeholder="Selecione o tipo de identificação"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Número de Identificação"
          placeholder="Digite seu número de identificação"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Cópia do Documento de Identificação"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader
                files={field.value}
                onChange={field.onChange}
              />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">
              Termos e Privacidade
            </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Aceito o tratamento"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Aceito a divulgação de informações"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Aceito a política de privacidade"
        />

        <SubmitButton isLoading={isLoading}>
          Enviar
        </SubmitButton>
      </form>
    </Form>
  );
};

//test

export default RegisterForm;
