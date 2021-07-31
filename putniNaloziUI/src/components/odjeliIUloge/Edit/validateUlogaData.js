export default function validateInfo(values) {
  let errors = {};
  if (!values.uloga.trim()) {
    errors.uloga = 'Ime je obavezno.';
  }
  return errors;
}
