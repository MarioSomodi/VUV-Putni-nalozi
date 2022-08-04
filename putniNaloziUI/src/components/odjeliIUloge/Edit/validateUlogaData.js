export default function validateInfo(values) {
  const errors = {};
  if (!values.uloga.trim()) {
    errors.uloga = 'Ime je obavezno.';
  }
  return errors;
}
