"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { EASE_OUT_EXPO } from "@/lib/motion";

const emptyValues = { nome: "", email: "", cidade: "" };

// Devolve um objeto só com os campos que têm erro.
function validate(values) {
  const errors = {};
  if (!values.nome.trim()) errors.nome = "Informe seu nome.";
  if (!values.email.trim()) errors.email = "Informe seu e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Informe um e-mail válido.";
  if (!values.cidade.trim()) errors.cidade = "Informe sua cidade.";
  return errors;
}

export default function TestRideForm() {
  const [values, setValues] = useState(emptyValues);
  // touched: campos que a pessoa já visitou. O erro só aparece depois disso,
  // para não acusar erro em campo que ainda nem foi preenchido.
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const successRef = useRef(null);

  const errors = validate(values);
  const visibleError = (name) => (touched[name] ? errors[name] : undefined);

  // Ao concluir, leva o foco para a mensagem de sucesso.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    setTouched({ nome: true, email: true, cidade: true });

    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    // Projeto fictício: simula o tempo de resposta de um servidor.
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1400);
  }

  function reset() {
    setValues(emptyValues);
    setTouched({});
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <motion.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className="flex flex-col items-start gap-6 rounded-media border border-linha bg-grafite p-8 outline-none md:p-10"
      >
        <p className="font-mono text-label font-medium uppercase text-volt">
          Pedido recebido
        </p>
        <p className="text-h3 font-medium">
          Tudo certo, {values.nome.trim().split(" ")[0]}. Entraremos em contato
          em até 1 dia útil para combinar seu test ride.
        </p>
        <Button variant="secondary" onClick={reset}>
          Enviar outro pedido
        </Button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    // noValidate desliga os balões de erro do navegador; a validação é a nossa.
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field
        label="Nome"
        name="nome"
        type="text"
        autoComplete="name"
        placeholder="Seu nome"
        value={values.nome}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleError("nome")}
      />
      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleError("email")}
      />
      <Field
        label="Cidade"
        name="cidade"
        type="text"
        autoComplete="address-level2"
        placeholder="São Paulo"
        value={values.cidade}
        onChange={handleChange}
        onBlur={handleBlur}
        error={visibleError("cidade")}
      />

      <Button
        type="submit"
        aria-disabled={submitting}
        className={`w-full ${submitting ? "cursor-progress opacity-70" : ""}`}
      >
        {submitting ? "Enviando…" : "Agendar test ride"}
      </Button>

      <p className="font-mono text-spec text-concreto">
        Sem compromisso. Respondemos em até 1 dia útil.
      </p>
    </form>
  );
}
