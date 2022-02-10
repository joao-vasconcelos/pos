export default function Icon({ name, size }) {
  return <i className={`icon-${name}`} style={{ fontSize: size || 40 }} />;
}
