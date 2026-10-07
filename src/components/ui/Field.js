/**
 * Campo de formulário: rótulo, input e mensagem de erro.
 * - htmlFor/id ligam o rótulo ao campo (clicar no rótulo foca o input).
 * - aria-invalid e aria-describedby fazem o leitor de tela anunciar o erro
 *   junto com o campo.
 */
export default function Field({ label, name, error, ...props }) {
  const errorId = `${name}-erro`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-label font-medium uppercase text-concreto"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-14 rounded-field border bg-grafite px-5 text-nevoa transition-colors duration-300 placeholder:text-concreto hover:border-concreto focus:border-nevoa ${
          error ? "border-erro" : "border-linha"
        }`}
        {...props}
      />
      {error && (
        <p id={errorId} className="font-mono text-spec text-erro">
          {error}
        </p>
      )}
    </div>
  );
}
