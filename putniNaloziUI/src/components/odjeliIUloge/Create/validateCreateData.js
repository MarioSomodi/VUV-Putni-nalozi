export default function validateInfo(values) {
  const errors = {};
  if (!values.naziv.trim()) {
    errors.naziv = 'Naziv je obavezan.';
  }
  return errors;
}
