export default function validateInfo(values) {
  const errors = {};
  if (!values.username.trim()) {
    errors.username = 'Korisničko ime je obavezno.';
  }
  if (!values.password.trim()) {
    errors.password = 'Lozinka je obavezna.';
  }
  return errors;
}
