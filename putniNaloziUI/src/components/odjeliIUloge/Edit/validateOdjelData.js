export default function validateInfo(values) {
  const errors = {};
  if (!values.odjel.trim()) {
    errors.odjel = 'Ime je obavezno.';
  }
  return errors;
}
