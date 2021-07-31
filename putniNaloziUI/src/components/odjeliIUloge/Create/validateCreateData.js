export default function validateInfo(values) {
  let errors = {};
  if (!values.naziv.trim()) {
    errors.naziv = 'Naziv je obavezan.';
  }
  return errors;
}
