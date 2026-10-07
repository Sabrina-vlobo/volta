/**
 * Limita a largura do conteúdo e aplica a margem lateral do grid
 * (20px no mobile, 40px a partir de 768px).
 * `as` permite trocar a tag: <Container as="section">.
 */
export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[90rem] px-5 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
