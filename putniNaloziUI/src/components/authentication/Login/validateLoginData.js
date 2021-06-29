export default function validateInfo(values) {
  let errors = {};
  if (!values.korisnickoIme.trim()) {
    errors.korisnickoIme = 'Korisnicko ime je obavezno.';
  }
  if (!values.lozinka.trim()) {
    errors.lozinka = 'Lozinka je obavezna.';
  }
  return errors;
}
