export default function validateInfo(values) {
  let errors = {};
  if (!values.odjel.trim()) {
    errors.odjel = 'Ime je obavezno.';
  }
  return errors;
}
