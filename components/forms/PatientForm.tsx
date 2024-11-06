"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2, {
    message:
      "Username must be at least 2 characters.",
  }),
});

const PatientForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Bem vindo</h1>
          <p className="text-dark-700">
            Agende sua consulta
          </p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nome Completo"
          placeholder="Digite seu nome"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Telefone"
        placeholder="Digite seu telefone"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
